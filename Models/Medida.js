const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const Medida = sequelize.define('Medida', {
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
  tableName: 'Medida'
});

module.exports = Medida;