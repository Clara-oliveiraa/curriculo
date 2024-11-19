require('dotenv').config(); // Carregar as variáveis de ambiente do .env
const express = require('express');
const bodyParser = require('body-parser');
const curriculoRoutes = require('./routes/curriculo');
const sequelize = require('./config/sequelize'); // Conexão com o banco de dados

const app = express();

// Porta fornecida pelo serviço ou padrão para 3000
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições em JSON
app.use(bodyParser.json());

// Rotas
app.use('/curriculo', curriculoRoutes);

// Conexão e sincronização com o banco de dados
sequelize.sync({ force: false }) // Ajuste 'force' para evitar perda de dados
  .then(() => {
    console.log('Banco sincronizado.');
    // Iniciar o servidor somente após o banco ser sincronizado
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
