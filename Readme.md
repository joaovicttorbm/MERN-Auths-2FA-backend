# Backend Project

Este projeto é uma API backend desenvolvida utilizando Node.js, TypeScript e uma arquitetura modular com foco em escalabilidade, manutenibilidade e segurança.

## Tabela de Conteúdos

- [Descrição](#descrição)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

Este backend foi projetado para ser uma aplicação escalável, segura e fácil de manter. A arquitetura é modular e baseada em TypeScript, com foco em boas práticas de desenvolvimento, como a separação de responsabilidades e a reutilização de código.

## Arquitetura do Projeto

A estrutura do projeto é dividida de forma a isolar funcionalidades e responsabilidades, permitindo uma fácil expansão e manutenção. Abaixo está uma visão geral das pastas e arquivos principais:

### **`@types`**:

Contém definições de tipos globais e interfaces para o TypeScript, garantindo a consistência de tipos em toda a aplicação.

### **`common`**:

Pasta que contém funcionalidades compartilhadas, como enums, interfaces e funções utilitárias, que são usadas em diferentes módulos do sistema.

- **`enums`**: Define valores constantes usados em várias partes da aplicação (ex: status de autenticação, códigos de erro).
- **`interface`**: Contém interfaces para objetos que são passados entre módulos.
- **`utils`**: Funções auxiliares para manipulação de strings, data, e outras operações comuns.
- **`validators`**: Funções de validação para garantir que os dados estejam corretos antes de serem processados.

### **`config`**:

Arquivos de configuração para variáveis de ambiente, banco de dados, autenticação, entre outros.

- **`app.config.ts`**: Contém configurações gerais da aplicação (como chaves secretas e variáveis de ambiente).
- **`http.config.ts`**: Configurações relacionadas ao servidor HTTP.

### **`database`**:

Contém a configuração do banco de dados e modelos de dados para interagir com o armazenamento persistente.

- **`models`**: Define os modelos de dados e mapeamentos para as tabelas ou coleções do banco de dados.
- **`database.ts`**: Configuração e inicialização da conexão com o banco de dados.

### **`mailers`**:

Contém a lógica para envio de e-mails, incluindo templates e clientes de e-mail.

- **`templates`**: Templates de e-mail que são usados para enviar mensagens personalizadas.
- **`mailer.ts`**: Lógica para enviar e-mails via serviços como SMTP ou APIs de terceiros.
- **`resendClient.ts`**: Integração com o serviço Resend para envio de e-mails.

### **`middlewares`**:

Middlewares utilizados para interceptar e processar as requisições HTTP antes de chegar aos controladores.

- **`asyncHandler.ts`**: Middleware para lidar com erros em controladores assíncronos.
- **`errorHandler.ts`**: Middleware para centralizar o tratamento de erros.
- **`passport.ts`**: Configuração do Passport.js para autenticação e validação de tokens.

### **`modules`**:

Cada módulo representa uma funcionalidade específica da aplicação e é composto por controladores, serviços, e modelos.

- **`auth`**: Módulo responsável por todo o fluxo de autenticação, incluindo login, registro e gerenciamento de tokens.
- **`mfa`**: Módulo para implementar autenticação multifatorial.
- **`session`**: Módulo responsável por gerenciar sessões de usuário.
- **`user`**: Módulo para gerenciar as informações dos usuários, como cadastro, atualização de perfil e recuperação de senha.

## Instalação

### Requisitos

- Node.js >= 16.x
- NPM ou Yarn
- Banco de dados (dependendo da sua configuração)

### Passos para Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/backend-project.git
   cd backend-project
   ```

2. Instale as dependências:

   ```bash
   npm install
   yarn install

   ```

3. Configure as variáveis de ambiente. Crie um arquivo .env com as seguintes variáveis:

   ```makefile
   PORT=8000
   NODE_ENV=development

   MONOGO_URI="mongodb+srv://<username>:<password>@<>.mongodb.net/mern_db"
   APP_ORIGIN="http://localhost:3000"
   JWT_SECRET="jwt_secret_key"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_SECRET="jwt_refresh_secret_key"
   JWT_REFRESH_EXPIRES_IN="30d"

   RESEND_API_KEY=""
   MAILER_SENDER="onboarding@resend.dev"

   ```

4. Inicie o servidor:

   ```bash
   npm run dev

   yarn dev
   ```

O servidor estará rodando em http://localhost:${PORT}.

## Uso

A API está organizada em módulos e utiliza autenticação via JWT. As rotas principais são protegidas por middleware de autenticação, garantindo que apenas usuários autenticados possam acessar dados sensíveis.

### Fluxo de Autenticação

<!-- 1. **Registro de usuário**: Envia uma requisição `POST /auth/register` com os dados do usuário.
2. **Login de usuário**: Envia uma requisição `POST /auth/login` para obter um token JWT.
3. **Proteção de rotas**: Use o token JWT nas requisições para acessar rotas protegidas, passando-o no cabeçalho `Authorization`. -->

## Estrutura do Projeto

src/
│
├── @types/
│ └── index.d.ts
│
├── common/
│ ├── enums/
│ ├── interface/
│ ├── utils/
│ └── validators/
│
├── config/
│ ├── app.config.ts
│ └── http.config.ts
│
├── database/
│ ├── models/
│ └── database.ts
│
├── mailers/
│ ├── templates/
│ ├── mailer.ts
│ └── resendClient.ts
│
├── middlewares/
│ ├── asyncHandler.ts
│ ├── errorHandler.ts
│ └── passport.ts
│
└── modules/
├── auth/
├── mfa/
├── session/
└── user/

## Contribuição

1. Faça o fork deste repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`).
4. Envie para o seu repositório (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License.
