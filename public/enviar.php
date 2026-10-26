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

$cuerpo = "Nueva solicitud de cotización desde wps.cl\n"
        . str_repeat('─', 44) . "\n\n"
        . "Nombre y empresa: $nombre\n"
        . "Email:            $email\n"
        . "Teléfono:         " . ($telefono ?: '—') . "\n"
        . "Servicio:         " . ($servicio ?: '—') . "\n\n"
        . "Alcance del proyecto:\n$mensaje\n\n"
        . str_repeat('─', 44) . "\n"
        . 'Enviado: ' . date('d-m-Y H:i') . " · IP: $ip\n"
        . "Responda este correo para contestarle directamente al cliente.\n";

$cabeceras = array_filter([
    'From: ' . '=?UTF-8?B?' . base64_encode(NOMBRE_SITIO) . '?=' . ' <' . REMITENTE . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($nombre) . '?=' . " <$email>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
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
