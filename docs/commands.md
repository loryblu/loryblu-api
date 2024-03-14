# Lista de comandos

Esses comandos estão configurados na propriedade `scripts` do `package.json`

```json
{
  "scripts": {
    // Gera o arquivo de produção
    "build": "nest build",
    // Executa o ambiente de produção
    "start:prod": "node dist/src/main",

    // Executa o ambiente de desenvolvimento
    "start:dev": "nest start --watch",
    // Configura o ambiente de desenvolvimento e
    // roda as migrações, gera as tipagens, as seeds e inicia o app
    "dev": "npm run prisma:migrate && npm run prisma:generate && npm run prisma:seed && npm run start:dev",

    // Formatam os arquivos
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",

    // Testes
    "test": "dotenv -e .env -- jest",
    // Testes com modo 'watch' ativo
    "test:watch": "dotenv -e .env -- jest --watch",

    // Sobe o container docker no ambiente de desenvolvimento
    "docker:dev": "docker compose -f docker-compose.dev.yml up -d",
    ...
  }
}
```
