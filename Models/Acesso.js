const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const Categoria = DataTypes.ENUM('Cadastros', 'Utilitários', 'Consultas', 'Relatórios', 'Dashboards', 'Configurações');

const Acesso = sequelize.define('Acesso', {
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
  rota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: Categoria,
    allowNull: false
  }
}, {
  tableName: 'Acesso'
});

module.exports = Acesso;