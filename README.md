## Installation

Antes de tudo, crie um arquivo chamado `.env` na raiz do projeto. O que deve ser preenchido está no arquivo chamado `.env.example`.

```bash
# atualiza e inicializa o submódulo de email-templates
$ git submodule update --init --recursive
```

```bash
# instala todas as dependências
$ yarn install
```

## Running the app

```bash
# executa as migrações do prisma, gera os tipos e inicia
# a aplicação no modo desenvolvimento
$ yarn run dev

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
