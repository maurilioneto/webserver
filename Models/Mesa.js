const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const TipoMesa = DataTypes.ENUM('Comum','Reserva');

const Mesa = sequelize.define('Mesa', {
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
  tipoMesa: {
    type: TipoMesa,
    allowNull: false
  },
  dataReserva: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Mesa'
});

module.exports = Mesa;