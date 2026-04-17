<?php

namespace Src\Controllers;

use Src\Models\Medico;

class MedicoController
{
    private $medico;

    public function __construct()
    {
        $this->medico = new Medico();
    }

    public function index(): void
    {
        $medicos = $this->medico->getAll();

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($medicos);
    }

    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true);

        if (empty($body['nome']) || empty($body['CRM']) || empty($body['UFCRM'])) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['mensagem' => 'Campos obrigatórios: nome, CRM, UFCRM']);
            return;
        }

        $this->medico->create($body);

        http_response_code(201);
        header('Content-Type: application/json');
        echo json_encode(['mensagem' => 'Médico criado com sucesso']);
    }
}