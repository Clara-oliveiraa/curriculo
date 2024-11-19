const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Importando a instância do Sequelize

const Curriculo = sequelize.define('Curriculo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'curriculos'
});

module.exports = Curriculo;
