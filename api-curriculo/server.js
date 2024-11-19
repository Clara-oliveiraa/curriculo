require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const curriculoRoutes = require('./routes/curriculo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/curriculo', curriculoRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const sequelize = require('./config/sequelize');
sequelize.sync({ force: true }).then(() => {
  console.log('Banco sincronizado.');
});
