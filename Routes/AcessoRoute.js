const express = require('express');
const Acesso = require('../Models/Acesso');
const config = require('../config.json');

const acessoRoute = express.Router();

//OBTER TODOS
acessoRoute.get('/obterTodos', async (req, res) => {
    await Acesso.findAll().then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Acessos!\n" + `Error: ${error}`);
    })
});

//OBTER POR ID
acessoRoute.post('/obterPorId', async (req, res) => {
    await Acesso.findByPk(req.body.id).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).send("Não foi possível obter o Acesso!\n" + `Error: ${error}`);
    });
});

//SALVAR
acessoRoute.post('/salvar', async (req, res) => {
    try {
        const acesso = await Acesso.build(req.body);
        await acesso.save();
        res.status(200).json(acesso);
    } catch (error) {
        res.status(400).send("Não foi possível salvar o Acesso!\n" + `Error: ${error}`);
    }
});

//DELETAR
acessoRoute.post('/deletarPorId', async (req, res) => {
    try {
        const acesso = await Acesso.findByPk(req.body.id);
        acesso.destroy();
        res.status(200).send(acesso);
    } catch (error) {
        res.status(400).send("Não foi possícel deletar o Acesso!\n" + `Error: ${error}`);
    }
});

module.exports = acessoRoute;