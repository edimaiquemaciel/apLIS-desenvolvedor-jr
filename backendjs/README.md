# Clínica — Backend de Pacientes (Node.js)

API REST para gerenciamento de **pacientes**, desenvolvida com **Node.js**, **Express** e **MySQL2**. Segue uma arquitetura em camadas com separação entre rotas, controllers, models e conexão com o banco de dados.

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
| [Node.js](https://nodejs.org/) | >= 18 | Plataforma de execução |
| [Express](https://expressjs.com/) | 5 | Framework HTTP |
| [MySQL2](https://github.com/sidorares/node-mysql2) | 3 | Driver de conexão com MySQL |
| [dotenv](https://github.com/motdotla/dotenv) | 17 | Carregamento de variáveis de ambiente |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- Instância MySQL acessível

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd backendjs

# Instale as dependências
npm install
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
| `PORT` | Porta em que o servidor irá rodar (padrão: `3000`) |

---

## Banco de dados

Execute o script abaixo para criar a tabela necessária:

```sql
CREATE TABLE pacientes (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(255) NOT NULL,
    dataNascimento DATE,
    carteirinha   VARCHAR(100) NOT NULL,
    cpf           VARCHAR(11)  NOT NULL
);
```

---

## Executando o servidor

```bash
node index.js
```

O servidor estará disponível em `http://localhost:<PORT>`.

---

## Endpoints

Base path: `/api/v1`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/pacientes` | Retorna todos os pacientes |
| `POST` | `/pacientes` | Cadastra um novo paciente |
| `PUT` | `/pacientes/:id` | Atualiza os dados de um paciente |
| `DELETE` | `/pacientes/:id` | Remove um paciente |

### Corpo esperado — POST / PUT

```json
{
  "nome": "João da Silva",
  "dataNascimento": "1990-05-20",
  "carteirinha": "123456",
  "cpf": "12345678901"
}
```

### Respostas de erro comuns

| Status | Situação |
|---|---|
| `400` | Campos obrigatórios ausentes |
| `500` | Erro interno no servidor |

---

## Estrutura do projeto

```
backendjs/
├── src/
│   ├── Controllers/
│   │   └── PacienteController.js  # Lógica de negócio e respostas HTTP
│   ├── Database/
│   │   └── connection.js          # Singleton de conexão com o MySQL
│   ├── Models/
│   │   └── Paciente.js            # Queries SQL encapsuladas
│   └── Routes/
│       └── api.js                 # Definição e registro das rotas
├── index.js                       # Ponto de entrada — inicialização do Express
├── .env.example
└── package.json
```
