const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carregar as variáveis de ambiente do .env

// Criando a instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // nome do banco
  process.env.DB_USER, // usuário
  process.env.DB_PASSWORD, // senha
  {
    host: process.env.DB_HOST, // localhost ou outro host
    dialect: 'postgres' // ou o tipo do banco de dados que está utilizando
  }
);

module.exports = sequelize;
