const { Sequelize } = require('sequelize');

//Configuracion para una base de datos sqlite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/peliculas.sqlite'
});


module.exports = {
  sequelize
}