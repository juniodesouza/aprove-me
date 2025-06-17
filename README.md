# Aprove-me API

Este repositório contém uma API desenvolvida em [NestJS](https://nestjs.com/) com Prisma.

## Como preparar o ambiente

1. Instale o Node.js na versão 20 ou superior.
2. Copie o arquivo `backend/.env.example` para `backend/.env` e preencha as variáveis necessárias.

## Como instalar as dependências

Dentro do diretório `backend` execute:

```bash
npm ci
```

## Como rodar o projeto

### Modo de desenvolvimento

Ainda em `backend` execute:

```bash
npm run start:dev
```

### Utilizando Docker

Foi criado um `Dockerfile` e um `docker-compose.yaml` para facilitar a execução da API.

Para construir a imagem:

```bash
docker build -t aprove-me-api .
```

Para iniciar a aplicação com o Docker Compose:

```bash
docker compose up
```

A aplicação ficará disponível em `http://localhost:3000/integrations`.
