const Acesso = require("./Acesso");
const ItemMenu = require("./ItemMenu");
const Medida = require("./Medida");
const Mesa = require("./Mesa");
const Pedido = require("./Pedido.JS");
const TipoItem = require("./TipoItem");
const Usuario = require("./Usuario");

var models = {};

//IMPORTAR OS OBJETOS
models.Usuario = Usuario;
models.ItemMenu = ItemMenu;
models.Mesa = Mesa;
models.Pedido = Pedido;
models.TipoItem = TipoItem;
models.Acesso = Acesso;
models.Medida = Medida;

//RELAÇÕES
Mesa.hasMany(Pedido, { foreignKey: 'mesaId', targetKey: 'mesaId' });
ItemMenu.hasMany(Pedido, { foreignKey: 'itemId', targetKey: 'itemId' });
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId', targetKey: 'usuarioId' });
TipoItem.hasMany(ItemMenu, { foreignKey: 'tipoItemId', targetKey: 'tipoItemId'});
Medida.hasMany(ItemMenu, { foreignKey: 'medidaId', targetKey: 'medidaId'});

module.exports = models;