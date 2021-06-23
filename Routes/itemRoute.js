const express = require('express');
const Item = require('../Models/ItemMenu');
const config = require('../config.json');

const itemRoute = express.Router();

//OBTER TODOS
itemRoute.get('/obterTodos', async (req, res) => {
    //obter acessos deste tipo de acesso
    await Item.findAll().then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Itens!\n" + `Error: ${error}`);
    })
});

//OBTER POR ID
itemRoute.get('/obterPorId', async (req, res) => {
    //obter acessos deste tipo de acesso
    await Item.findByPk(req.body).then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter o Item!\n" + `Error: ${error}`);
    })
});

//SALVAR
itemRoute.post('/salvar', async (req, res) => {
    try {
        const Item = await Usuario.build(req.body);
        await Item.save();
        res.status(200).json(Item);
    } catch (error) {
        res.status(400).send("Não foi possível salvar o Item!\n" + `Error: ${error}`);
    }
});

//DELETAR
itemRoute.post('/deletarPorId', async (req, res) => {
    try {
        const Item = await Usuario.findByPk(req.body);
        Item.destroy();
        res.status(200).send(Item);
    } catch (error) {
        res.status(400).send("Não foi possícel deletar o Item!\n" + `Error: ${error}`);
    }
});

module.exports = itemRoute;