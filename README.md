# LoryBlu API

![version](https://img.shields.io/github/package-json/v/loryblu/loryblu-api?style=flat-square&labelColor=f2f2f2&color=white)
![license](https://img.shields.io/github/license/loryblu/loryblu-api?style=flat-square&labelColor=f2f2f2&color=white)
![main tool](https://img.shields.io/badge/Nest_JS-f2f2f2?logo=nestjs&logoColor=db1737&style=flat-square)
![Database](https://img.shields.io/badge/PostgreSQL-50b0f0?logo=postgresql&logoColor=f2f2f2&style=flat-square)

<details>
  <summary>Descrição em <b>pt-BR</b></summary>

### Requisitos

1. [Node.js 18.x LTS](https://nodejs.org/en) Instalado.
1. [PostgreSQL](https://www.postgresql.org/) ou [docker + docker-compose](https://docs.docker.com/compose/) instalado.

> ⚠ Se você tem o `docker` e `docker-compose` instalados, não precisa instalar o `PostgreSQL` (banco de dados), há um arquivo configurado para usar o PostgreSQL no docker, o `docker-compose.dev.yml`

## Clone o repositório

```bash
# git clone <repo-url> <dist>
git clone https://github.com/loryblu/loryblu-api.git loryblu-api
```

Este comando vai clonar o repositório para o destino definido. Você pode omitir o destino.

## Configurar ambiente

1. Duplique o arquivo `.env.example` do projeto principal;
1. Renomeie para `.env`;

Atualize o novo `.env` com as instruções a seguir:

```md
# Substitua os exemplos dentro dos colchetes "[Database username]" pelo valor final "root"

PORT=[Porta que o servidor expõe]

# ex: 8080

NODE_ENV=[Ambiente atual]

# ex: development

SALT_DATA_HASH=[Chave secreta para mesclar com o hash de dados sensíveis]

# ex: secret.salt.data

SALT_DATA_PASS=[Chave secreta para randomizar a senha]

# ex: 8

SECRET_JWT=[Senha para os tokens de acesso]

# ex: example123#

MAIL_PORT=[Porta de acesso do serviço de e-mail]

# ex: 1234

MAIL_HOST=[Domínio do serviço de e-mail]

# ex: smtp.email.com.br

MAIL_USER=[Nome do usuário de e-mail]

# ex: User123

MAIL_PASS=[Senha de acesso ao serviço de e-mail]

# ex: abcde123456

MAIL_NAME=[Nome da API]

# ex: LoryBlu

MAIL_FROM=[E-mail de contato da aplicação]

# ex: contato.app@example.com

MAIL_WHITELIST=[Lista de e-mails para teste]

# ex: example_1@email.com,example_@email.com,example_3@email.com

POSTGRES_USER=[Nome de usuário do banco de dados]

# ex: admin

POSTGRES_PASSWORD=[Senha do banco de dados]

# ex: strongPass

POSTGRES_DB=[Nome da base de dados]

# ex: loryblu-clone-api

POSTGRES_HOST=[Host do banco de dados]

# ex: localhost

POSTGRES_PORT=[Porta do banco de dados]

# ex: 5432

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

# ! Este valor não precisa ser alterado, use-o como está.
```

## Instalação

### Submódulos

Depois de clonar este repositório, e se for adicionado ou atualizado um dos submódulos, execute o comando abaixo para atualizar e iniciar todos os submódulos.

```bash
$ git submodule update --init --recursive
```

### Dependências

Depois de clonar e sempre que atualizar o repositório, execute o comando abaixo para manter as dependências atualizadas.

```bash
$ yarn
```

## Executando a aplicação

<details>
<summary><b>Está usando docker?</b></summary>

Use o comando abaixo para executar a aplicação no docker e configurar as credenciais.

```bash
# Baixar imagem ` postgres:11.19-alpine ` e configurar base de dados;
# Baixar imagem ` node:18-alpine ` e configurar aplicação node;
yarn docker:dev
```

</details>

---

Esse comando executa tudo o que é necessário para configurar o banco de dados de desenvolvimento.

```bash
$ yarn dev
```

Esse comando apenas inicia a aplicação no modo de desenvolvimento.

```bash
$ yarn start:dev
```

Esse comando inicia a aplicação no modo de produção.

```bash
$ yarn run start:prod
```

## Testes

Testes unitários

```bash
$ yarn test
```

## Licença

LoryBlu tem [licença MIT](LICENSE).

</details>

Description in <b>en</b>

### Requirements

1. [Node.js 18.x LTS](https://nodejs.org/en) Installed.
1. [PostgreSQL](https://www.postgresql.org/) or [docker + docker-compose](https://docs.docker.com/compose/) installed.

> ⚠ If you have `docker` and `docker-compose` intalled, you do not need to install `PostgreSQL` (database), there is a configured file to use PostgreSQL in docker, `docker-compose.dev.yml`

## Clone the repository

Unit tests

```bash
# git clone <repo-url> <dist>
git clone https://github.com/loryblu/loryblu-api.git loryblu-api
```

This comamnd will clone the repository to the specified destination. You can omit the destination.

## Set up the enviroment

1. Duplicate the `.env.example` file from the main project;
1. Rename it to `.env`;

Update the new `.env` with the following instructions:

```md
# Replace the examples inside square brackets "[Database username]" with the final value "root"

PORT=[Port that the server exposes]

# e.g.: 8080

NODE_ENV=[Current environment]

# e.g.: development

SALT_DATA_HASH=[Secret key to merge with the sensitive data hash]

# e.g.: secret.salt.data

SALT_DATA_PASS=[Secret key to randomize the password]

# e.g.: 8

SECRET_JWT=[Access token password]

# e.g.: example123#

MAIL_PORT=[Email service access port]

# ex: 1234

MAIL_HOST=[Email service domainl]

# ex: smtp.email.com.br

MAIL_USER=[Email user name]

# ex: User123

MAIL_PASS=[Email service access password]

# ex: abcde123456

MAIL_NAME=[API name]

# ex: LoryBlu

MAIL_FROM=[Application contact email]

# ex: contato.app@example.com

MAIL_WHITELIST=[List of test emails]

# ex: example_1@email.com,example_@email.com,example_3@email.com

POSTGRES_USER=[Database username]

# e.g.: admin

POSTGRES_PASSWORD=[Database password]

# e.g.: strongPass

POSTGRES_DB=[Database name]

# e.g.: loryblu-clone-api

POSTGRES_HOST=[Database host]

# e.g.: localhost

POSTGRES_PORT=[Database port]

# e.g.: 5432

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

# ! This value does not need to be changed, use it as is.
```

## Installation

### Submodules

After cloning this repository, and if one of the submodules is added or updated, run the following command to update and initialize all submodules.

```bash
$ git submodule update --init --recursive
```

### Dependencies

After cloning and whenever you update the repository, run the following command to keep the dependencies up to date.

```bash
$ yarn
```

## Running the application

<details>
<summary><b>Are you using Docker?</b></summary>

Use the command below to run the application in Docker and configure the credentials

```bash
# Download the ` postgres:11.19-alpine ` image and configure the database;
# Download the ` node:18-alpine ` image and configure the Node application;
yarn docker:dev
```

</details>

---

This command performs everything necessary to set up the development database.

```bash
$ yarn dev
```

This command only starts the application in development mode.

```bash
$ yarn start:dev
```

This command starts the application in production mode.

```bash
$ yarn run start:prod
```

## Tests

Unit tests

```bash
$ yarn test
```

## License

LoryBlu has [licença MIT](LICENSE).
