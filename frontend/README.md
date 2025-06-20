# Frontend

Este diretorio contem o front-end do Aprova-me. A aplicacao foi desenvolvida com as tecnologias abaixo:

- **Vite** - bundler e servidor de desenvolvimento que oferece inicializacao rapida para projetos React.
- **React** - biblioteca JavaScript para construcao de interfaces de usuario.
- **Shadcn** - conjunto de componentes acessiveis e estilizados utilizando Radix UI e Tailwind.
- **Tailwind** - framework CSS utilitario para criacao de estilos de forma produtiva.
- **react-query** - gerencia e compartilha o estado das requisicoes assicronas.
- **react-hook-form** - facilita o controle e validacao de formularios em React.
- **zod** - biblioteca de validacao e tipagem de dados com TypeScript.
- **lucide-react** - icones em SVG para React.
- **axios** - cliente HTTP utilizado para consumo da API.

## Como iniciar

1. **Clone o repositório**

```bash
git clone https://github.com/juniodesouza/aprove-me
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz deste diretório definindo a variável `VITE_API_URL` com a URL do backend.

```bash
echo VITE_API_URL=http://localhost:3000/api > .env
```

4. **Inicie o projeto**

```bash
npm run dev
```

5. **Gere o build da aplicação**

```bash
npm run build
```

