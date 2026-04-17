<?php

require_once __DIR__ . '/../Controllers/MedicoController.php';

$controller = new \Src\Controllers\MedicoController();

if ($uri === '/api/v1/medicos') {
    if ($method === 'GET') {
        $controller->index();
    } elseif ($method === 'POST') {
        $controller->store();
    } else {
        http_response_code(405);
        echo json_encode(['mensagem' => 'Método não permitido']);
    }
} else {
    http_response_code(404);
    echo json_encode(['mensagem' => 'Rota não encontrada']);
}