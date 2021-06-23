const Acesso = require("./Acesso");
const Medida = require("./Medida");
const Usuario = require("./Usuario");

var models = {};

//IMPORTAR OS OBJETOS
models.Usuario = Usuario;
models.Acesso = Acesso;
models.Medida = Medida;

//RELAÇÕES
// por exemplo -> Usuario.hasMany(Acesso, { foreignKey: 'idAcesso', targetKey: 'idAcesso' });

module.exports = models;