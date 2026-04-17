<?php

namespace Src\Database;

class Connection
{
    private static $instance = null;

    private function __construct() {}

    public static function getInstance(): \PDO
    {
        if (self::$instance === null) {
            $host = 'localhost';
            $db   = 'clinica';
            $user = 'root';
            $pass = '2607';

            self::$instance = new \PDO(
                "mysql:host=$host;dbname=$db;charset=utf8",
                $user,
                $pass,
                [
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                ]
            );
        }

        return self::$instance;
    }
}