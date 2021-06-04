//IMPORTACOES
const sequelize = require('./Sequelize');
const express = require('express');
const http = require('http');
const https = require('https');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const app = express();


//IMPORTAR ROTAS
const {autenticacaoRoute, validarToken} = require('./Routes/AutenticacaoRoute');
const usuarioRoute = require('./Routes/UsuarioRoute');

//CONFIGURACAO 
const config = require('./config.json');
const credentials = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('certificate.pem')
};

app.use(cookieParser());

//ROTAS QUE NÃO REQUEREM AUTENTICACAO
app.use('/autenticar', express.json());
app.use('/autenticar', autenticacaoRoute);

//ROTAS QUE REQUEREM AUTENTICACAO
app.use('/rest', express.json());
app.use('/rest', validarToken);
app.use('/rest/usuario', usuarioRoute);

//IMPORTAR ARQUIVOS QUE NÃO PRECISAM DE AUTENTICAÇÃO
const listaArquivosNaoProtegidos = require('./WEB/config/arquivosNaoProtegidos.json');

//ROTAS FRONTEND
app.use((req, res) => {
    
    //obtendo requisição
    var check = req.url !== '/' ? req.url:config.defaultIndex;
    
    //função de retorno
    function returnFront(req, res) {
        //conferir nomes
        var filename = req.url !== '/' ? req.url:config.defaultIndex;
        var fullPath = config.rootFolder + filename;
    
        //debug
        config.DEBUG && console.log(`Requisição de ${req.ip} por ${fullPath}`)
    
        //procurar o arquivo e caso achado responder
        fs.readFile(config.rootFolder + filename, (err, data) => {
            if (err) {
                res.status(404).send();
            }
            res.sendFile(path.join(__dirname, fullPath));
        });
    }

    if (listaArquivosNaoProtegidos.findIndex(item => item == filename) >= 0) {
        returnFront(req, res);
    } else {
        validarToken(req, res, returnFront)
    }
})

//CONSTRUIR SERVER
const httpsServer = https.createServer(credentials, app);

//CRIAR BASE DE DADOS
if (config.createDatabase) {
    sequelize.sync({
        alter: config.createDatabaseAlter,
    })
    .then(()=>console.log("Criado base de dados!"))
    .catch((error)=>console.log(`Erro ao criar base de dados! Error: ${error}`))
}

//INICIAR
httpsServer.listen(
    config.PORT || 8080,
    () => console.log(`Server escutando na porta ${config.HOST ||'https://localhost'}:${config.PORT || 8080}`)
);