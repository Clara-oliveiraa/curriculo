require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const curriculoRoutes = require('./routes/curriculo');
const sequelize = require('./config/sequelize'); // Importa a configuração do Sequelize

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/curriculo', curriculoRoutes);

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Sincronizar banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync({ force: false }); // Altere para `force: true` somente para redefinir tabelas
  })
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  });
