# Aplicação Webserver

Este é um modelo base para iniciar aplicações Web.
Esta estrutura possui backend (Express e Sequelize) e frontend (angularJS e Bootstrap).

Suporta os seguintes bancos de dados:
- Mysql;
- MariaDB;
- Sqlite;
- SqlServer;
- Postgre;

## Iniciando com o projeto

### Intalação dos requisitos

1. **npm** e **node** são necessários para rodar o servidor, instale a versão de longo termo pelo [site oficial](https://nodejs.org/pt-br/).

2. Navege até a pasta e instale as dependências.

```
> npm install
```

### Configuração
1. Edite o arquivo **config.json** com os seus dados (como no exemplo abaixo, em um banco postgre local):
> Para mais orientações quanto ao Sequelize há uma guia rápido [neste link](https://sequelize.org/master/manual/getting-started.html).

```
{
    "PORT": 443,
    "HOST": "https://localhost",
    "rootFolder": "./WEB",
    "defaultIndex": "/index.html",
    "databaseVendor": "postgres",
    "databaseUser": "postgres",
    "databasePassword": "admin",
    "databaseSchema": "webserver",
    "databaseHost": "localhost",
    "createDatabase": true, 
    "createDatabaseAlter": true,
    "SALT": 10,
    "SECRET": "bacon is good!",
    "DEBUG": true
}
```

### Sobre Chaves SSH

1. Caso necessário gere um novo par de chaves para o protocolo ssh, [tutorial neste link](https://computadorcomwindows.com/2018/07/27/tutorial-como-gerar-uma-chave-ssh-no-windows-10/)

>
> **Aviso:** Caso utilize servidores em produção adicione config.json e suas chaves ssh ao **.gitignore** para que não fiquem acessíveis pelo git.
>

### Rodando o Projeto

1. Basta rodá-lo com node ou nodemon.

```
> node index.js
> nodemon index.js
```

2. Para desenvolvimento sugiro o nodemon, basta instala-lo globalmente e iniciar o projeto, a cada modificação ele reiniciará o server autormaticamente.

```
> npm i -g nodemon
> nodemon index.js
```
