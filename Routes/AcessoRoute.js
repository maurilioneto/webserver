const express = require('express');
const Acesso = require('../Models/Acesso');
const config = require('../config.json');

const acessoRoute = express.Router();

//OBTER TODOS
acessoRoute.get('/obterTodos', async (req, res) => {
    //obter acessos deste tipo de acesso
    await Acesso.findAll().then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Acessos!\n" + `Error: ${error}`);
    })
});

module.exports = acessoRoute;