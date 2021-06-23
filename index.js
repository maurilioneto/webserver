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
const {autenticacaoRoute, validarToken} = require('./Routes/autenticacaoRoute');
const sincronizarRoute = require('./Routes/sincronizarRoute');

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

//SINCRONIZAR
app.use('/sincronizar', sincronizarRoute);

//SINCRONIZAR ROTAS
const listaRotas = fs.readdirSync('./Routes/');
for (rota in listaRotas) {
    //IGNORAR AUTENTICAÇÃO E SINCRONIZAR
    if (listaRotas[rota] == 'AutenticacaoRoute.js' || listaRotas[rota] == 'SincronizarRoute.js') {
        continue;
    }

    //IMPORTAR ROTA
    try {
        let route = require(`./Routes/${listaRotas[rota]}`);
        //USAR NOME DO ARQUIVO COMO ROTA
        app.use(`/rest/${listaRotas[rota].split('Route.js')[0]}`, route);
        config.DEBUG && console.log(`Sincronizado rota para o arquivo ${listaRotas[rota]} -> /rest/${listaRotas[rota].split('Route.js')[0]}`);
    } catch {

    }
}

//ROTAS FRONTEND
app.use((req, res) => {
    
    //obtendo requisição
    var filename = req.url !== '/' ? req.url:config.DEFAULT_INDEX;
    var fullPath = config.WEB_FOLDER + filename;

    //debug
    config.DEBUG && console.log(`Requisição de ${req.ip} por ${filename}`)

    //procurar o arquivo e caso achado responder
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.status(404).send();
        }
        res.sendFile(path.join(__dirname, fullPath));
    });

})

//CONSTRUIR SERVER
const httpsServer = https.createServer(credentials, app);

//IMPORTAR MODELOS
const Models = require('./Models/Models');

//CRIAR BASE DE DADOS
sequelize.sync({
    alter: config.DATABASE_ACTION == 'update',
})
.then(()=>console.log("Banco sincronizado com sucesso!"))
.catch((error)=>console.log(`Erro ao sincronizar base de dados! Error: ${error}`))

//INICIAR
httpsServer.listen(
    config.PORT || 8080,
    () => console.log(`Server escutando na porta ${config.HOST ||'https://localhost'}:${config.PORT || 8080}`)
);