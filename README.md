# LoryBlu API

![version](https://img.shields.io/github/package-json/v/loryblu/loryblu-api?style=flat-square&labelColor=f2f2f2&color=white)
![license](https://img.shields.io/github/license/loryblu/loryblu-api?style=flat-square&labelColor=f2f2f2&color=white)
![main tool](https://img.shields.io/badge/Nest_JS-f2f2f2?logo=nestjs&logoColor=db1737&style=flat-square)
![Database](https://img.shields.io/badge/PostgreSQL-50b0f0?logo=postgresql&logoColor=f2f2f2&style=flat-square)

## Requisitos

1. [Node.js 18.x LTS](https://nodejs.org/en)
1. [docker e docker compose](https://docs.docker.com/compose/)

## Clone o repositório

```bash
git clone https://github.com/loryblu/loryblu-api.git loryblu-api
```

## Configure o ambiente

1. Duplique o arquivo `.env.example` do projeto principal;
1. Renomeie para `.env`;

Atualize o conteudo do novo `.env` com as instruções a seguir:

```bash
# Porta que a aplicação irá usar
PORT

# Ambiente em que a aplicação está rodando
NODE_ENV

# Uma senha para os dados sensíveis
SALT_DATA_HASH

# Um valor inteiro entre 1 e 10
SALT_DATA_PASS

# Uma senha para as chaves de acesso
SECRET_JWT

# Configuração do serviço de e-mail SMTP
# Porta, host, usuário e senha
MAIL_PORT
MAIL_HOST
MAIL_USER
MAIL_PASS

# Nome do aplicativo
MAIL_NAME
# Email do aplicativo
MAIL_FROM
# Lista de quem pode receber o e-mail durante
# desenvolvimento e teste de homologação
MAIL_WHITELIST

# Configuração do acesso ao banco de dados
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_HOST
POSTGRES_PORT

# Essa url já está configurada, só precisa configurar
# as propriedades anteriores.
DATABASE_URL
```

## Instalação

### Submódulos

Depois de clonar este repositório, e se for adicionado ou atualizado um dos submódulos, execute o comando abaixo para atualizar e iniciar todos os submódulos.

```bash
git submodule update --init --recursive
```

## Inicializando a aplicação

Executando o ambiente de desenvolvimento no `docker` com `docker compose`.

```bash
yarn docker:dev
```

> [!note]\
> Você pode conferir todos os comandos pré configurados [clique aqui](/docs/commands.md)

## Licença

LoryBlu tem [licença MIT](LICENSE).
