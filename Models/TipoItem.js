const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const TipoItem = sequelize.define('TipoItem', {
  //Atributos vão aqui
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  tableName: 'TipoItem'
});

module.exports = TipoItem;