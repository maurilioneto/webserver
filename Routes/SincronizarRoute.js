const express = require('express');
const config = require('../config.json');
const Acesso = require('../Models/Acesso');
const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');

const sincronizarRoute = express.Router();

//SINCRONIZAR OS ACESSOS
sincronizarRoute.use((req, res) => {

    //Adicionar Acessos
    Acesso.create({id: 10010, descricao: 'Rota 1', rota: '#!/rota1', categoria: 'Cadastros'});
    Acesso.create({id: 10020, descricao: 'Rota 2', rota: '#!/rota2', categoria: 'Cadastros'});
    Acesso.create({id: 20010, descricao: 'Principal', rota: '#!/principal', categoria: 'Consultas'});

    //Adicionar usuario caso não houver
    Usuario.findByPk(1).then(usuario => {
        usuario.save();
    }).catch(()=>{
        const usuario = Usuario.build({id: 1, nome: 'Administrador', email: 'admin@sistema.com', dataNascimento: '1990-01-01', senha: 'admin', emailVerificado: true, isAdmin: true});
        usuario.senha = bcrypt.hashSync(usuario.senha, config.SALT);
        usuario.save();
    });

    res.status(200).send('OK');
});

module.exports = sincronizarRoute;