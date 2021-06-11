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
        const usuario = await Usuario.build(req.body);
        //gerar hash da senha
        usuario.senha = await bcrypt.hashSync(usuario.senha, config.SALT);
        await usuario.save();
        //remover a senha ao devolver usuário
        usuario.senha = undefined;
        res.status(200).json(usuario);
    } catch (error) {
        config.DEBUG && console.log(error);
        res.status(400).json({error: 'Não foi possível registrar!'});
    }
});

//SAIR
autenticacaoRoute.post('/sair', async (req, res) => {
    try {
        res.clearCookie("authentication");
        res.redirect(301,'/#!/login');
    } catch (error) {
        config.DEBUG && console.log(error);
        res.status(400).json({error: 'Não foi possível processar a requisição!'});
    }
});

//MIDDLEWARE DE VALIDACAO
const validarToken = (req, res, next) => {
    if (req.cookies && req.cookies.authentication && jw.verify(req.cookies.authentication, config.SECRET)) {
        next();
    } else {
        config.DEBUG && console.log(`REDIRECIONADO ${req.url}`);
        res.redirect(301,'/#!/login');
    }
}

//MIDDLEWARE DE VALIDACAO FRONT END
const validarTokenFrontEnd = (req, res) => {
    if (!req.cookies || !req.cookies.authentication || !jw.verify(req.cookies.authentication, config.SECRET)) {
        res.status(403).send('Não Autorizado!');
    }
}

module.exports = {autenticacaoRoute, validarToken, validarTokenFrontEnd};