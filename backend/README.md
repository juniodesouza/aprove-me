# Aprova-me

Este projeto utiliza NestJS com Prisma e um banco SQLite para servir a API. A seguir estão os passos para iniciar o ambiente de desenvolvimento.

## Tecnologias

- **NestJS** - framework Node.js baseado em TypeScript para construção de APIs escaláveis.
- **Prisma** - ORM que simplifica o acesso e a manipulação do banco de dados com tipagem.
- **SQLite** - banco de dados relacional leve armazenado em um único arquivo, ideal para desenvolvimento e testes.

## Passos para iniciar o projeto

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e ajuste os valores conforme necessário. Certifique-se de que a variável `DATABASE_URL` aponte para o arquivo dentro de `database`.

```bash
cp .env.example .env
```

4. **Aplique as migrações do banco**

```bash
npx prisma migrate deploy
npx prisma db seed
```

5. **Inicie o projeto em modo de desenvolvimento**

```bash
npm run start:dev
```

6. **Acesse a documentação da API**

Abra o navegador em [http://localhost:3000/api](http://localhost:3000/api).
