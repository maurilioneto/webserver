const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const Usuario = sequelize.define('Usuario', {
  //Atributos vão aqui
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  saldo: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'Usuario'
});

module.exports = Usuario;