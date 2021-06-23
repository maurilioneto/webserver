const express = require('express');
const TipoItem = require('../Models/TipoItem');
const config = require('../config.json');

const tipoItemRoute = express.Router();

tipoItemRoute.get('/obterTodos', async (req, res) => {
    //obter acessos deste tipo de acesso
    await TipoItem.findAll().then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Tipos!\n" + `Error: ${error}`);
    })
});

tipoItemRoute.get('/obterPorId/:id', async (req, res) => {
    //obter acessos deste tipo de acesso
    await TipoItem.findByPk(req.params.id).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Tipos!\n" + `Error: ${error}`);
    })
});

tipoItemRoute.post('/salvar', async (req, res) => {
    try {
        var tipoItem;
        if (req.body.id) {
            tipoItem = await TipoItem.findByPk(req.body.id);
            for (i in req.body) {
                tipoItem[i] = req.body[i];
            }
            await tipoItem.save();
            console.log(tipoItem);
        } else {
            tipoItem = await TipoItem.create(req.body);
        }
        res.status(200).json(tipoItem);
    } catch (error) {
        res.status(400).send("Não foi possível salvar o Tipo!\n" + `Error: ${error}`);
    }
});

tipoItemRoute.post('/deletarPorId/:id', async (req, res) => {
    try {
        const tipoItem = await TipoItem.findByPk(req.params.id);
        tipoItem.destroy();
        res.status(200).send(tipoItem);
    } catch (error) {
        res.status(400).send("Não foi possícel deletar o Tipo!\n" + `Error: ${error}`);
    }
});

module.exports = tipoItemRoute;