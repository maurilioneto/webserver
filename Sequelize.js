//IMPORTAR O NECESSÁRIO
const { Sequelize } = require('sequelize');
const config = require('./config.json');

// caso use sqlite3
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './DB/database.sqlite'
// });
//DEFINIR A CONEXÃO
const sequelize = new Sequelize(config.databaseSchema, config.databaseUser, config.databasePassword, {
    host: config.databaseHost,
    dialect: config.databaseVendor/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

//TENTAR CONEXÃO
sequelize.authenticate()
.then(()=>console.log('Conectado ao Banco de Dados com sucesso!'))
.catch((error)=>console.error('Não foi possível se conectar ao Banco de Dados: ', error))

module.exports = sequelize;