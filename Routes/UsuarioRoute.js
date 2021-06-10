const express = require('express');
const Usuario = require('../Models/Usuario');
const config = require('../config.json');
const bcrypt = require('bcryptjs');

const usuarioRoute = express.Router();

//OBTER TODOS
usuarioRoute.get('/obterTodos', async (req, res) => {
    console.log('AQUI');
    await Usuario.findAll().then(data => {
        data.forEach(usuario => usuario.senha = undefined);
        res.status(200).json(data.flat());
    }).catch(error => {
        res.status(400).send("Não foi possível obter os Usuários!\n" + `Error: ${error}`);
    })
});

//OBTER POR ID
usuarioRoute.post('/obterPorId', async (req, res) => {
    await Usuario.findByPk(req.body.id).then(data => {
        data.senha = undefined;
        res.status(200).json(data);
    }).catch(error => {
        res.status(400).send("Não foi possível obter o Usuário!\n" + `Error: ${error}`);
    });
});

//SALVAR
usuarioRoute.post('/salvar', async (req, res) => {
    try {
        const usuario = await Usuario.build(req.body);
        usuario.senha = bcrypt.hashSync(usuario.senha, config.SALT);
        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).send("Não foi possível salvar o Usuário!\n" + `Error: ${error}`);
    }
});

//DELETAR
usuarioRoute.post('/deletarPorId', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.body.id);
        usuario.destroy();
        res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send("Não foi possícel deletar o Usuário!\n" + `Error: ${error}`);
    }
});

module.exports = usuarioRoute;