# Clínica — Frontend

Interface web responsiva para gerenciamento de médicos e pacientes de uma clínica médica. Desenvolvida com **React** e **Material UI**, com suporte a múltiplos idiomas e layout adaptado para dispositivos móveis.

---

## Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev/) | 19 | Biblioteca de UI |
| [Vite](https://vite.dev/) | 8 | Bundler e servidor de desenvolvimento |
| [Material UI](https://mui.com/) | 9 | Componentes e sistema de design |
| [MUI X Date Pickers](https://mui.com/x/react-date-pickers/) | 9 | Seletor de datas |
| [React Hook Form](https://react-hook-form.com/) | 7 | Gerenciamento de formulários |
| [Zod](https://zod.dev/) | 4 | Validação de esquemas |
| [Axios](https://axios-http.com/) | 1 | Requisições HTTP |
| [i18next](https://www.i18next.com/) | 26 | Internacionalização (pt-BR / en) |
| [Day.js](https://day.js.org/) | 1 | Manipulação de datas |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- npm ou yarn

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd app

# Instale as dependências
npm install
```

---

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha com as URLs das APIs:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_API_MEDICOS` | URL base da API de médicos (backend PHP) |
| `VITE_API_PACIENTES` | URL base da API de pacientes (backend Node.js) |

**Exemplo:**

```env
VITE_API_MEDICOS=http://localhost:8000/api/v1
VITE_API_PACIENTES=http://localhost:3000/api/v1
```

---

## Scripts disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Pré-visualizar o build gerado
npm run preview

# Executar o linter
npm run lint
```

---

## Estrutura do projeto

```
src/
├── components/
│   ├── ui/                      # Componentes reutilizáveis de interface
│   │   ├── BaseFormDialog.jsx   # Dialog base para formulários
│   │   ├── DataTable.jsx        # Tabela genérica com cabeçalho estilizado
│   │   ├── DialogActionButtons.jsx
│   │   ├── FormPatternField.jsx # Campo com máscara (CPF, CRM)
│   │   ├── FormTextField.jsx    # Campo de texto padronizado
│   │   ├── MobileCard.jsx       # Card para exibição em dispositivos móveis
│   │   ├── PageHeader.jsx       # Cabeçalho de página com ícone e contador
│   │   └── RowActionButtons.jsx # Botões de editar e deletar por linha
│   ├── ConfirmDialog.jsx
│   ├── EditMedicoDialog.jsx
│   ├── EditPacienteDialog.jsx
│   ├── Sidebar.jsx
│   └── Toast.jsx
├── constants/
│   └── muiStyles.js             # Estilos MUI centralizados e reutilizáveis
├── i18n/
│   ├── en.js                    # Traduções em inglês
│   ├── pt.js                    # Traduções em português
│   └── index.js                 # Configuração do i18next
├── pages/
│   ├── Medicos.jsx
│   └── Pacientes.jsx
├── schemas/
│   ├── medicoSchema.js          # Schema de validação Zod para médicos
│   └── pacienteSchema.js        # Schema de validação Zod para pacientes
├── services/
│   └── api.js                   # Instâncias Axios e funções de acesso à API
├── App.jsx
├── main.jsx
└── index.css
```

---

## Funcionalidades

- **Gestão de médicos** — cadastro, edição e exclusão, com integração ao backend PHP
- **Gestão de pacientes** — cadastro, edição e exclusão, com integração ao backend Node.js
- **Layout responsivo** — tabelas no desktop e cards no mobile, com breakpoints do MUI
- **Sidebar adaptativa** — recolhível no desktop e drawer temporário com overlay no mobile
- **Validação de formulários** — schemas Zod integrados ao React Hook Form com mensagens de erro localizadas
- **Internacionalização** — suporte a português (pt-BR) e inglês (en), com troca dinâmica de idioma
- **Feedback visual** — toasts de sucesso, erro e aviso, além de diálogos de confirmação para ações destrutivas

## 🔗 Integração dos serviços

Para o funcionamento completo da aplicação, é necessário executar:

1. Backend PHP (porta 8000)
2. Backend Node.js (porta 3000)
3. Frontend React

Certifique-se de configurar corretamente as variáveis de ambiente do frontend com as URLs das APIs.
