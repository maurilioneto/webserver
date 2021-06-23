const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const Usuario = sequelize.define('Usuario', {
  //Atributos vão aqui
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  emailVerificado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'Usuario'
});

module.exports = Usuario;