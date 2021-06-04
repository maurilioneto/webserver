const express = require('express');
const Usuario = require('../Models/Usuario');
const config = require('../config.json');
const jw = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const autenticacaoRoute = express.Router();

//AUTENTICAR (OBTER TOKEN)
autenticacaoRoute.post('/', async (req, res) => {

    //validar se foi enviado
    if (!req.body.email || !req.body.senha) {
        res.status(400).json({error: 'Não informado usuário e senha!'})
    }

    //localizar o usuário
    Usuario.findOne(
        { 
            where: { 
                email: req.body.email
            }
        }
    ).then(usuario => {
        //validar senha
        if (bcrypt.compareSync(req.body.senha, usuario.senha)) {
            //gerar token
            const token = jw.sign(usuario.toJSON(), config.SECRET);
            res.cookie("authentication", token); 
            res.status(200).send();
        } else {
            res.status(400).json({error: 'Senha incorreta!'});
        }
    }).catch(error => {
        config.DEBUG && console.log(error);
        res.status(400).json({error: 'Usuario não existe!'});
    });
});

//REGISTRAR
autenticacaoRoute.post('/registrar', async (req, res) => {
    try {
        const usuario = Usuario.build(req.body);
        //gerar hash da senha
        usuario.senha = bcrypt.hashSync(usuario.senha, config.SALT);
        await usuario.save();
        //remover a senha ao devolver usuário
        usuario.senha = undefined;
        res.status(200).json(usuario);
    } catch (error) {
        config.DEBUG && console.log(error);
        res.status(400).json({error: 'Não foi possível registrar!'});
    }
});

//MIDDLEWARE DE VALIDACAO
const validarToken = (req, res, next) => {
    config.DEBUG && console.log(req.cookies);
    if (jw.verify(req.cookies.authentication, config.SECRET)) {
        next();
    } else {
        res.redirect('/#!/login');
    }
}

module.exports = {autenticacaoRoute, validarToken};