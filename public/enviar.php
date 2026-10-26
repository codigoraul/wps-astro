<?php
/**
 * Formulario de cotización wps.cl → correo.
 * Anti-spam sin servicios externos:
 *   1. Campo trampa (honeypot) "website"
 *   2. Tiempo mínimo entre carga de la página y envío
 *   3. Límite de envíos por IP
 *   4. Filtro de contenido (links, palabras de spam, alfabetos no latinos)
 *   5. Validación estricta en servidor + bloqueo de inyección de cabeceras
 */

declare(strict_types=1);

date_default_timezone_set('America/Santiago');

// ───────── Configuración ─────────
const DESTINO        = 'crodriguez@wps.cl';
const COPIA_PRUEBA   = 'codigoraul@gmail.com';  // TEMPORAL: copia oculta para pruebas. Dejar en '' para quitarla.
const REMITENTE      = 'no-reply@wps.cl';      // debe ser del mismo dominio para no caer en spam
const NOMBRE_SITIO   = 'WPS Welding & Pipelines';
const SEG_MINIMO     = 4;                      // segundos mínimos para completar el formulario
const SEG_MAXIMO     = 60 * 60 * 6;            // formulario abierto más de 6 h = sospechoso
const MAX_ENVIOS     = 3;                      // envíos permitidos por IP…
const VENTANA_SEG    = 600;                    // …cada 10 minutos
const MAX_LINKS      = 1;
const PAG_GRACIAS    = '/gracias/';
const PAG_ERROR      = '/contacto/?error=1';
const PALABRAS_SPAM  = [
    'casino', 'viagra', 'cialis', 'crypto', 'bitcoin', 'forex', 'loan', 'porn', 'sex',
    'seo services', 'backlink', 'guest post', 'rank your website', 'web traffic',
    'telegram', 'whatsapp me', 'investment opportunity', 'escort', 'betting',
];

// ───────── Utilidades ─────────
$esAjax = (($_SERVER['HTTP_ACCEPT'] ?? '') === 'application/json')
       || (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'XMLHttpRequest');

function responder(bool $ok, string $mensaje, int $codigo = 200): never
{
    global $esAjax;
    if ($esAjax) {
        http_response_code($codigo);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $mensaje], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: ' . ($ok ? PAG_GRACIAS : PAG_ERROR), true, 303);
    }
    exit;
}

/** Para bots: fingimos éxito para no darles pistas. */
function descartarSilencioso(): never
{
    responder(true, 'Gracias, recibimos su solicitud.');
}

function limpiar(string $v, int $max): string
{
    $v = trim(strip_tags($v));
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

function sinSaltos(string $v): string
{
    return trim(str_replace(["\r", "\n", '%0a', '%0d'], ' ', $v));
}

// ───────── 0. Solo POST ─────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contacto/', true, 303);
    exit;
}

// ───────── 1. Honeypot ─────────
if (!empty($_POST['website'] ?? '')) {
    descartarSilencioso();
}

// ───────── 2. Tiempo de llenado ─────────
$inicio = (int) ($_POST['fs'] ?? 0);                 // ms, lo pone el JS al cargar la página
$transcurrido = $inicio > 0 ? (int) floor((microtime(true) * 1000 - $inicio) / 1000) : -1;
if ($transcurrido < SEG_MINIMO || $transcurrido > SEG_MAXIMO) {
    descartarSilencioso();
}

// ───────── 3. Límite por IP ─────────
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$dirRate = sys_get_temp_dir() . '/wps_form_rate';
if (!is_dir($dirRate)) {
    @mkdir($dirRate, 0700, true);
}
$archivoIp = $dirRate . '/' . hash('sha256', $ip . '|wps.cl');
$ahora = time();
$envios = [];
if (is_file($archivoIp)) {
    $envios = array_filter(
        array_map('intval', explode(',', (string) @file_get_contents($archivoIp))),
        fn(int $t) => $t > $ahora - VENTANA_SEG
    );
}
if (count($envios) >= MAX_ENVIOS) {
    responder(false, 'Ha enviado varias solicitudes seguidas. Intente nuevamente en unos minutos o escríbanos por WhatsApp.', 429);
}

// ───────── 5. Validación ─────────
$nombre   = sinSaltos(limpiar((string) ($_POST['nombre'] ?? ''), 120));
$email    = sinSaltos(limpiar((string) ($_POST['email'] ?? ''), 160));
$telefono = sinSaltos(limpiar((string) ($_POST['telefono'] ?? ''), 30));
$servicio = sinSaltos(limpiar((string) ($_POST['servicio'] ?? ''), 120));
$mensaje  = limpiar((string) ($_POST['mensaje'] ?? ''), 4000);

$errores = [];
if (mb_strlen($nombre) < 2)                                   $errores[] = 'nombre';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))               $errores[] = 'email';
if ($telefono !== '' && !preg_match('/^[0-9+()\s.\-]{6,30}$/', $telefono)) $errores[] = 'teléfono';
if (mb_strlen($mensaje) < 10)                                 $errores[] = 'alcance del proyecto';
if ($errores) {
    responder(false, 'Revise estos campos: ' . implode(', ', $errores) . '.', 422);
}

// ───────── 4. Filtro de contenido ─────────
$todo = mb_strtolower("$nombre $email $servicio $mensaje");
$links = preg_match_all('~(https?://|www\.|\[url|<a\s)~i', $todo);
if ($links > MAX_LINKS) {
    descartarSilencioso();
}
foreach (PALABRAS_SPAM as $p) {
    if (str_contains($todo, $p)) {
        descartarSilencioso();
    }
}
// Cirílico, chino, japonés, coreano, árabe → casi siempre spam para una empresa chilena
if (preg_match('/[\p{Cyrillic}\p{Han}\p{Hiragana}\p{Katakana}\p{Hangul}\p{Arabic}]/u', $todo)) {
    descartarSilencioso();
}
if (preg_match('/https?:\/\//i', $nombre)) {
    descartarSilencioso();
}

// ───────── Envío ─────────
$asunto = 'Nueva cotización web – ' . $nombre . ($servicio ? " ($servicio)" : '');
$asuntoCod = '=?UTF-8?B?' . base64_encode($asunto) . '?=';
$fecha = date('d-m-Y H:i');

// Versión texto (respaldo para clientes de correo sin HTML)
$texto = "Nueva solicitud de cotización desde wps.cl\n\n"
       . "Nombre y empresa: $nombre\n"
       . "Email: $email\n"
       . "Teléfono: " . ($telefono ?: '—') . "\n"
       . "Servicio: " . ($servicio ?: '—') . "\n\n"
       . "Alcance del proyecto:\n$mensaje\n\n"
       . "Enviado: $fecha · IP: $ip\n"
       . "Responda este correo para contestarle directamente al cliente.\n";

// Versión HTML
$h = fn(string $v): string => htmlspecialchars($v, ENT_QUOTES | ENT_HTML5, 'UTF-8');
$telLimpio = preg_replace('/[^0-9+]/', '', $telefono) ?? '';
$waNumero  = ltrim($telLimpio, '+');
if ($waNumero !== '' && strlen($waNumero) === 9 && $waNumero[0] === '9') {
    $waNumero = '56' . $waNumero;                  // celular chileno sin código de país
}
$telLink = $waNumero !== '' ? '+' . $waNumero : '';
$asuntoResp = rawurlencode('Re: Cotización WPS' . ($servicio ? " – $servicio" : ''));

$fila = fn(string $label, string $valor): string =>
    '<tr><td style="padding:10px 0;border-bottom:1px solid #e6e9ef;width:150px;vertical-align:top;font-size:13px;color:#6b7280;">' . $label . '</td>'
  . '<td style="padding:10px 0;border-bottom:1px solid #e6e9ef;vertical-align:top;font-size:15px;color:#0a1a3a;font-weight:600;">' . $valor . '</td></tr>';

$boton = fn(string $href, string $texto, string $bg): string =>
    '<a href="' . $h($href) . '" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;background:' . $bg . ';color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:4px;">' . $texto . '</a>';

$botones = $boton("mailto:$email?subject=$asuntoResp", 'Responder por correo', '#ff4d00');
if ($waNumero !== '') {
    $botones .= $boton("https://wa.me/$waNumero", 'WhatsApp', '#25d366');
}
if ($telLimpio !== '') {
    $botones .= $boton("tel:$telLink", 'Llamar', '#0a1a3a');
}

$html = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $h($asunto) . '</title></head>'
. '<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:24px 12px;"><tr><td align="center">'
. '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid #e1e5ec;">'
// Cabecera
. '<tr><td style="background:#0a1a3a;padding:22px 28px;">'
.   '<span style="font-size:26px;font-weight:800;color:#ff4d00;letter-spacing:1px;">WPS</span>'
.   '<span style="font-size:12px;color:#c7cfdd;letter-spacing:2px;text-transform:uppercase;padding-left:10px;">Welding &amp; Pipelines</span>'
. '</td></tr>'
. '<tr><td style="height:4px;background:#ff4d00;line-height:4px;font-size:0;">&nbsp;</td></tr>'
// Título
. '<tr><td style="padding:28px 28px 8px;">'
.   '<p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;font-weight:700;">Nueva solicitud de cotización</p>'
.   '<h1 style="margin:0;font-size:22px;line-height:1.3;color:#0a1a3a;">' . $h($nombre) . '</h1>'
.   ($servicio ? '<p style="margin:8px 0 0;font-size:15px;color:#374151;">Interesado en: <strong>' . $h($servicio) . '</strong></p>' : '')
. '</td></tr>'
// Datos
. '<tr><td style="padding:12px 28px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
.   $fila('Nombre y empresa', $h($nombre))
.   $fila('Email', '<a href="mailto:' . $h($email) . '" style="color:#0a1a3a;">' . $h($email) . '</a>')
.   $fila('Teléfono', $telefono !== '' ? '<a href="tel:' . $h($telLink) . '" style="color:#0a1a3a;">' . $h($telefono) . '</a>' : '<span style="color:#9ca3af;font-weight:400;">No indicado</span>')
.   $fila('Servicio', $servicio !== '' ? $h($servicio) : '<span style="color:#9ca3af;font-weight:400;">No indicado</span>')
. '</table></td></tr>'
// Mensaje
. '<tr><td style="padding:20px 28px 8px;">'
.   '<p style="margin:0 0 8px;font-size:13px;color:#6b7280;">Alcance del proyecto</p>'
.   '<div style="background:#f6f7f9;border-left:4px solid #ff4d00;padding:16px 18px;font-size:15px;line-height:1.6;color:#1f2937;">' . nl2br($h($mensaje)) . '</div>'
. '</td></tr>'
// Acciones
. '<tr><td style="padding:20px 28px 12px;">' . $botones . '</td></tr>'
// Pie
. '<tr><td style="padding:16px 28px 24px;border-top:1px solid #e6e9ef;font-size:12px;line-height:1.5;color:#9ca3af;">'
.   'Enviado desde el formulario de <a href="https://wps.cl/contacto/" style="color:#9ca3af;">wps.cl</a> el ' . $h($fecha) . ' · IP ' . $h($ip) . '<br>'
.   'Al responder este correo, la respuesta le llega directamente al cliente.'
. '</td></tr>'
. '</table></td></tr></table></body></html>';

$limite = '=_wps_' . bin2hex(random_bytes(12));
$cuerpo = "This is a multi-part message in MIME format.\r\n\r\n"
        . "--$limite\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($texto)) . "\r\n"
        . "--$limite\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html)) . "\r\n"
        . "--$limite--\r\n";

$cabeceras = array_filter([
    'From: ' . '=?UTF-8?B?' . base64_encode(NOMBRE_SITIO) . '?=' . ' <' . REMITENTE . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($nombre) . '?=' . " <$email>",
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $limite . '"',
    'X-Mailer: wps.cl',
    COPIA_PRUEBA !== '' ? 'Bcc: ' . COPIA_PRUEBA : '',
]);

$enviado = @mail(DESTINO, $asuntoCod, $cuerpo, implode("\r\n", $cabeceras), '-f' . REMITENTE);

if (!$enviado) {
    responder(false, 'No pudimos enviar su solicitud en este momento. Escríbanos a ' . DESTINO . ' o por WhatsApp.', 500);
}

$envios[] = $ahora;
@file_put_contents($archivoIp, implode(',', $envios), LOCK_EX);

responder(true, 'Gracias, recibimos su solicitud. Le responderemos dentro de 24 horas hábiles.');
