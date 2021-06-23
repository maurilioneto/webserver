const express = require('express');
const computarErro = require('../computarErro');
const Medida = require('../Models/Medida');
const medidaRoute = express.Router();

medidaRoute.get('/obterTodos', async (req, res) => {
    await Medida.findAll().then(data => {
        res.status(200).json(data.flat());
    }).catch(error => {
        error = computarErro(error);
        res.status(400).send("Não foi possível obter as Medidas!\n\r" + `Erro: ${error}`);
    })
});

medidaRoute.post('/obterPorId/:id', async (req, res) => {
    await Medida.findByPk(req.params.id).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        error = computarErro(error);
        res.status(400).send("Não foi possível obter a Medida!\n\r" + `Erro: ${error}`);
    });
});

medidaRoute.post('/salvar', async (req, res) => {
    try {
        var medida;
        if (req.body.id) {
            medida = await Medida.findByPk(req.body.id);
            for (i in req.body) {
                medida[i] = req.body[i];
            }
            await medida.save();
        } else {
            medida = await Medida.create(req.body);
        }
        res.status(200).json(medida);
    } catch (error) {
        error = computarErro(error);
        res.status(400).send("Não foi possível salvar a Medida!\n\r" + `Erro: ${error}`);
    }
});

medidaRoute.post('/deletarPorId/:id', async (req, res) => {
    try {
        const medida = await Medida.findByPk(req.params.id);
        medida.destroy();
        res.status(200).send(medida);
    } catch (error) {
        error = computarErro(error);
        res.status(400).send("Não foi possícel deletar a Medida!\n\r" + `Erro: ${error}`);
    }
});

module.exports = medidaRoute;