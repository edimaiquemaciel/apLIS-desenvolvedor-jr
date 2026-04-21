# Clínica — Backend de Médicos (PHP)

API REST para gerenciamento de **médicos**, desenvolvida em **PHP puro** com **PDO** e **MySQL**, sem dependência de frameworks externos. Segue uma arquitetura em camadas com autoload PSR-4 via Composer.

---

## Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [Executando o servidor](#executando-o-servidor)
- [Endpoints](#endpoints)
- [Estrutura do projeto](#estrutura-do-projeto)

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [PHP](https://www.php.net/) | >= 8.3 | Linguagem de programação |
| [PDO](https://www.php.net/manual/pt_BR/book.pdo.php) | — | Abstração de acesso ao banco de dados |
| [Composer](https://getcomposer.org/) | — | Gerenciamento de dependências e autoload PSR-4 |
| MySQL | — | Banco de dados relacional |

---

## Pré-requisitos

- PHP >= 8.3 com as extensões **PDO** e **PDO_MySQL** habilitadas
- [Composer](https://getcomposer.org/) instalado globalmente
- Instância MySQL acessível

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd backendphp

# Instale as dependências (autoload Composer)
composer install
```

---

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha com os dados do seu ambiente:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do banco de dados MySQL |
| `DB_NAME` | Nome do banco de dados |
| `DB_USER` | Usuário do banco de dados |
| `DB_PASS` | Senha do banco de dados |

> As variáveis são carregadas manualmente via `file()` no `public/index.php`, sem dependência de biblioteca externa.

---

## Banco de dados

Execute o script abaixo para criar a tabela necessária:

```sql
CREATE TABLE medicos (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    nome   VARCHAR(255) NOT NULL,
    CRM    VARCHAR(6)   NOT NULL,
    UFCRM  VARCHAR(2)   NOT NULL
);
```

---

## Executando o servidor

Utilizando o servidor embutido do PHP (recomendado para desenvolvimento):

```bash
php -S localhost:8000 -t public/
```

O servidor estará disponível em `http://localhost:8000`.

> Para ambientes de produção, configure um servidor web como **Apache** ou **Nginx** com o document root apontando para a pasta `public/`.

---

## Endpoints

Base path: `/api/v1`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/medicos` | Retorna todos os médicos |
| `POST` | `/medicos` | Cadastra um novo médico |
| `PUT` | `/medicos/:id` | Atualiza os dados de um médico |
| `DELETE` | `/medicos/:id` | Remove um médico |

### Corpo esperado — POST / PUT

```json
{
  "nome": "Dra. Ana Lima",
  "CRM": "123456",
  "UFCRM": "CE"
}
```

### Respostas de erro comuns

| Status | Situação |
|---|---|
| `400` | Campos obrigatórios ausentes |
| `404` | Rota não encontrada |
| `405` | Método HTTP não permitido |
| `500` | Erro interno no servidor |

---

## Estrutura do projeto

```
backendphp/
├── public/
│   └── index.php              # Ponto de entrada — CORS, .env e despacho de rotas
├── src/
│   ├── Controllers/
│   │   └── MedicoController.php  # Lógica de negócio e respostas HTTP
│   ├── Database/
│   │   └── Connection.php        # Singleton PDO
│   ├── Models/
│   │   └── Medico.php            # Queries SQL encapsuladas via PDO
│   └── Routes/
│       └── api.php               # Roteamento manual via regex
├── composer.json
└── .env.example
```
