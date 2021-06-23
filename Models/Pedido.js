const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const Item = require('./ItemMenu');
const Mesa = require('./Mesa');
const Usuario = require('./Usuario');

const Pedido = sequelize.define('Pedido', {
  //Atributos vão aqui
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valorPedido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entregue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'Pedido'
});

module.exports = Pedido;