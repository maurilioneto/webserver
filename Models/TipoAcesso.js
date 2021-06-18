const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const Acesso = require('./Acesso');

const TipoAcesso = sequelize.define('TipoAcesso', {
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
  }
}, {
  tableName: 'TipoAcesso'
});

TipoAcesso.hasMany(Acesso);

module.exports = TipoAcesso;