const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const ItemMenu = sequelize.define('ItemMenu', {
  //Atributos vão aqui
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  valorVenda: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'ItemMenu'
});

module.exports = ItemMenu;