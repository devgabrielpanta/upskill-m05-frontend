# 🧩 Frontend — Mini ClickUp API Explorer

- Autor - Gabriel: [@devgabrielpanta](https://www.github.com/devgabrielpanta)
- Repositorio ➡️ [Acessar repositorio](https://github.com/devgabrielpanta/upskill-m05-backend)

---

## 📋 Sobre o Projeto

Este é um projeto acadêmico desenvolvido com o objetivo de criar uma API simples que imita um serviço para uma plataforma de gestão de tarefas (inspirado em ferramentas como o ClickUp), como parte do Módulo 05 - Backend: Node.js e APIs do programa UPSKILL.

O **Mini ClickUp API Explorer** é uma interface interativa em página única (SPA), inspirada em ferramentas como Swagger, desenvolvida para consumir e testar a API RESTful do projeto **Mini ClickUp**. Este frontend foi construído utilizando **HTML**, **Tailwind CSS** e **TypeScript puro (Vanilla JS com ES Modules)**.

#### ⚠️ Disclaimer

Este repositório contém um projeto acadêmico desenvolvido para fins de avaliação. É importante salientar que as tecnologias utilizadas, a arquitetura do código e a lógica de negócio foram estritamente determinadas pelos requisitos do professor e do enunciado, não refletindo necessariamente as minhas escolhas técnicas num cenário de produção real.

## 📂 Estrutura do Projeto

A arquitetura segue o padrão em camadas, separando rotas, controladores, serviços e repositório de dados, além de middlewares para segurança e tratamento de erros.

```javascript
src/
├─ api/
│ └─ api.client.ts # Cliente HTTP base (Fetch API) — centraliza todas as requisições à API
├─ models/
│ ├─ .base/
│ │ ├─ base.entity.ts # Classe abstrata base para todas as entidades
│ │ ├─ base.store.ts # Store genérica base (gerenciamento de estado em memória)
│ │ └─ index.ts
│ ├─ tasks/
│ │ ├─ task.entity.ts # Classe Task — molda o objeto recebido do JSON
│ │ ├─ task.store.ts # TaskStore — estado em memória das tarefas
│ │ └─ index.ts
│ ├─ tags/
│ │ ├─ tag.entity.ts # Classe Tag
│ │ ├─ tag.store.ts # TagStore
│ │ └─ index.ts
│ └─ users/
│ ├─ user.entity.ts # Classe User
│ ├─ user.store.ts # UserStore
│ └─ index.ts
├─ services/
│ ├─ task.service.ts # Lógica de negócio e chamadas à API para Tasks
│ ├─ user.service.ts # Lógica de negócio e chamadas à API para Users
│ ├─ tag.service.ts # Lógica de negócio e chamadas à API para Tags
│ ├─ taskTag.service.ts # Lógica de negócio para relacionamento Task x Tags
│ └─ index.ts
├─ ui/
│ ├─ BaseEndpointUI.ts # Classe abstrata — renderiza status e respostas JSON no DOM
│ ├─ EndpointController.ts # Controlador genérico — escuta eventos, coleta inputs, invoca services
│ ├─ htmlMapping.ts # Mapeamento declarativo de cada endpoint aos elementos HTML (IDs)
│ ├─ user.ui.ts # Inicialização dos controllers de Users
│ ├─ task.ui.ts # Inicialização dos controllers de Tasks
│ ├─ tag.ui.ts # Inicialização dos controllers de Tags
│ └─ taskTag.ui.ts # Inicialização dos controllers de Task x Tags
└─ main.ts # Entry point — importa os módulos UI e configura feedback global
```

### 🔎 Responsabilidades por camada

- **api/**
  - Centraliza a configuração de requisições HTTP
  - Define baseURL, headers e tratamento de erros

- **models/**
  - **Entities**: modelam os dados recebidos da API
  - **Stores**: gerenciam o estado em memória da aplicação

- **services/**
  - Implementam regras de negócio
  - Orquestram chamadas à API
  - Atualizam as stores

- **ui/**
  - Controlam a interação com o usuário
  - Escutam eventos do DOM
  - Coletam dados dos inputs
  - Invocam os services
  - Renderizam respostas JSON na interface

---

## 🚀 Como Executar o Projeto

### ⚠️ IMPORTANTE

> 🚨 **Este frontend depende do backend para funcionar corretamente.**  
> Certifique-se de que a API do Mini ClickUp esteja rodando simultaneamente, geralmente em:
>
> ```
> http://localhost:3000
> ```

---

### 📦 Instalação

```bash
npm install
```

### ▶️ Executar em ambiente de desenvolvimento

```bash
npm run dev
```