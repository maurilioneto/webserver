//IMPORTAR O NECESSÁRIO
const { Sequelize } = require('sequelize');
const config = require('./config.json');

// caso use sqlite3
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './DB/database.sqlite'
// });
//DEFINIR A CONEXÃO
const sequelize = new Sequelize(config.DATABASE_SCHEMA, config.DATABASE_USER, config.DATABASE_PASSWORD, {
    host: config.DATABASE_HOST,
    dialect: config.DATABASE_TYPE/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

//TENTAR CONEXÃO
sequelize.authenticate()
.then(()=>console.log('Conectado ao Banco de Dados com sucesso!'))
.catch((error)=>console.error('Não foi possível se conectar ao Banco de Dados: ', error))

module.exports = sequelize;