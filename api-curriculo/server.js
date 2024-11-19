require('dotenv').config(); // Carrega as variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize'); // Configuração do Sequelize
const curriculoRoutes = require('./routes/curriculo'); // Rotas relacionadas ao currículo

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Middleware para interpretar JSON no body das requisições

// Rotas
app.use('/curriculo', curriculoRoutes); // Usa as rotas criadas no arquivo `curriculo.js`

// Conectar ao banco de dados e iniciar o servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync({ force: false }); // Configurado para não apagar dados existentes
  })
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  });
