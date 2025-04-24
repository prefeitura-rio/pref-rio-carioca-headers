<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Recaptcha-Token");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Pre-flight request, respond successfully
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get reCAPTCHA token from header
$headers = getallheaders();
$recaptchaToken = isset($headers['X-Recaptcha-Token']) ? $headers['X-Recaptcha-Token'] : null;

if (!$recaptchaToken) {
    http_response_code(400);
    echo json_encode(['error' => 'reCAPTCHA token missing']);
    exit;
}

// Forward the request to the metrics endpoint
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://staging.busca.dados.rio/metrics/clique');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Recaptcha-Token: ' . $recaptchaToken
]);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy error: ' . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>