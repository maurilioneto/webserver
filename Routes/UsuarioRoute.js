const express = require('express');
const Usuario = require('../Models/Usuario');

const usuarioRoute = express.Router();

//OBTER TODOS
usuarioRoute.get('/obterTodos', async (req, res) => {
    Usuario.findAll().then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Usuários!\n" + `Error: ${error}`);
    })
});

//OBTER POR ID
usuarioRoute.post('/obterPorId', async (req, res) => {
    Usuario.findByPk(req.body.id).then(data => {
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).send("Não foi possível obter o Usuário!\n" + `Error: ${error}`);
    });
});

//OBTER TODOS
usuarioRoute.post('/salvar', async (req, res) => {
    try {
        const usuario = Usuario.build(req.body);
        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).send("Não foi possível salvar o Usuário!\n" + `Error: ${error}`);
    }
});

//OBTER TODOS
usuarioRoute.post('/deletarPorId', async (req, res) => {
    try {
        const usuario = Usuario.build(req.body);
        usuario.destroy();
        res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send("Não foi possícel deletar o Usuário!\n" + `Error: ${error}`);
    }
});

module.exports = usuarioRoute;