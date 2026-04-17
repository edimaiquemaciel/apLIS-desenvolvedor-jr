<?php

namespace Src\Models;

use Src\Database\Connection;

class Medico
{
    private $db;

    public function __construct()
    {
        $this->db = Connection::getInstance();
    }

    public function getAll(): array
    {
        $stmt = $this->db->query('SELECT * FROM medicos');
        return $stmt->fetchAll();
    }

    public function create(array $data): void
    {
        $stmt = $this->db->prepare(
            'INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)'
        );

        $stmt->execute([
            ':nome'  => $data['nome'],
            ':CRM'   => $data['CRM'],
            ':UFCRM' => $data['UFCRM'],
        ]);
    }

    public function update(int $id, array $data): void
    {
        $stmt = $this->db->prepare(
            'UPDATE medicos SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM WHERE id = :id'
        );

        $stmt->execute([
            ':nome'  => $data['nome'],
            ':CRM'   => $data['CRM'],
            ':UFCRM' => $data['UFCRM'],
            ':id'    => $id,
        ]);
    }

    public function delete(int $id): void
    {
        $stmt = $this->db->prepare('DELETE FROM medicos WHERE id = :id');
        $stmt->execute([':id' => $id]);
    }
}