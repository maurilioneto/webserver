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
    "WEB_FOLDER": "./WEB",
    "DEFAULT_INDEX": "/index.html",
    "DATABASE_TYPE": "postgres",
    "DATABASE_USER": "postgres",
    "DATABASE_PASSWORD": "admin",
    "DATABASE_SCHEMA": "webserver",
    "DATABASE_HOST": "localhost",
    "DATABASE_ACTION": "update",
    "SALT": 10,
    "SECRET": "bacon is good!",
    "DEBUG": true
}
```

### Sobre Chaves SSH

1. Caso necessário gere um novo par de chaves para o protocolo ssh, [tutorial neste link](https://computadorcomwindows.com/2018/07/27/tutorial-como-gerar-uma-chave-ssh-no-windows-10/)

>
> **Aviso:** Caso faça uma brach para uso pessoal/comercial adicione config.json e suas chaves ssh ao **.gitignore** para que as suas informações privadas não fiquem vulneráveis pelo git.
>

### Rodando o Projeto

1. Instalar as dependências

```
> npm install
```
2. Rodar o projeto

```
//para testar use o comando npm test (regarrega ao alterar arquivos)
> npm test

//para teste ou produção (necessário reiniciar ao fazer modificações)
> npm start
```

O projeto ficará acessível em [https://localhost](https://localhost) (ignore os avisos de segurança como certificado, já que é um certificado gerado sem um domínio).

3. Para gerar os acessos e o primeiro usuário deve-se acessar a rota **/sincronizar** manualmente ou pelo navegador.

[https://localhost/rest/sincronizar](https://localhost/rest/sincronizar)

O usuário padrão é 'admin@sistema.com', senha 'admin'.

4. Para criar novas telas basta criar um html em **/WEB/views**, criar um controller para tela em **/WEB/controllers**, configurar a rota em **/WEB/config/menuRoute.js**, importar o javascript do controller em **/WEB/index.html**, adicionar os novos acessos no arquivo **/Routes/SincronizarRoute.js** na raiz do projeto e usar a rota sincronizar novamente.

5. Para criar novos modelos no backend (objetos) basta adicionar novos arquivos em **/Models**, gerar uma rota em **/Routes** e ao reiniciar a rota já estará funcionando.