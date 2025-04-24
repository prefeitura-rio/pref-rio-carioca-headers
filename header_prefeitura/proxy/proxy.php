<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Get all parameters from the request
$params = $_GET;

// Extract the reCAPTCHA token from parameters
$recaptchaToken = isset($params['recaptcha_token']) ? $params['recaptcha_token'] : null;
unset($params['recaptcha_token']); // Remove token from forwarded parameters

// Build the target API URL with remaining parameters
$apiUrl = 'https://staging.busca.dados.rio/search/multi?' . http_build_query($params);

// Prepare headers - we only send the reCAPTCHA token now
$headers = [];
if ($recaptchaToken) {
    $headers[] = "X-Recaptcha-Token: " . $recaptchaToken;
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    // Handle cURL errors
    http_response_code(500);
    echo json_encode(['error' => 'Proxy error: ' . curl_error($ch)]);
} else {
    // Forward the API response exactly as received
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>