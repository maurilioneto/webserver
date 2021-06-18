const express = require('express');
const config = require('../config.json');
const Acesso = require('../Models/Acesso');
const TipoAcesso = require('../Models/TipoAcesso');
const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');

const sincronizarRoute = express.Router();

//SINCRONIZAR OS ACESSOS
sincronizarRoute.use((req, res) => {
    
    //Adicionar Tipo Acesso
    TipoAcesso.create({id: 1, descricao: 'Padrão'})

    //Adicionar Acessos
    Acesso.create({id: 10, descricao: 'Rota 1', rota: '#!/rota1', categoria: 'Cadastros', TipoAcessoId: 1});
    Acesso.create({id: 20, descricao: 'Rota 2', rota: '#!/rota2', categoria: 'Cadastros', TipoAcessoId: 1});
    Acesso.create({id: 30, descricao: 'Principal', rota: '#!/principal', categoria: 'Consultas', TipoAcessoId: 1});

    //adicionar estes acessos ao primeiro usuario se houver
    Usuario.findByPk(1).then(usuario => {
        usuario.TipoAcessoId = 1;
        usuario.save();
    }).catch(()=>{
        const usuario = Usuario.build({id: 1, nome: 'Administrador', email: 'admin@sistema.com', dataNascimento: '1990-01-01', senha: 'admin', emailVerificado: true, isAdmin: true, TipoAcessoId: 1});
        usuario.senha = bcrypt.hashSync(usuario.senha, config.SALT);
        usuario.save();
    });

    res.status(200).send('OK');
});

module.exports = sincronizarRoute;