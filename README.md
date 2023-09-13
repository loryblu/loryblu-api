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
1. [Resend](https://resend.com/home) Serviço de e-mail usado na aplicação.

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

MAIL_API_KEY=[Chave do serviço Resend]
# ex: re_123456789

MAIL_FROM=[Email de contato da aplicação]
# ex: contato.app@example.com

MAIL_TEST_DELIVERED=[Email para teste : sucesso]
# ex: mail.delivered@example.com

MAIL_TEST_BOUNCED=[Email para teste : erro]
# ex: mail.bounced@example.com

MAIL_TEST_COMPLAINED=[Email para teste : marcado como spam]
# ex: mail.complained@example.com

POSTGRES_USER=[Nome de usuário do baco de dados]
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

Depois de clonar e semple que atualizar o repositório, execute o comando abaixo para manter as dependências atualizadas.
```bash
$ yarn
```

## Executando a aplicação

<details>
<summary><b>Está usando docker?</b></summary>

Use o comando abaixo para baixar a imagem do PostgreSQL:14-alpine e configurar as credenciais.
```bash
docker-compose -f docker-compose.dev.yml up -d
```

Se preferir, há um script configurado para realizar este comando e todos os outros de desenvolvimento. Ele também inicia a aplicação:
```bash
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
