const express = require('express');
const Curriculo = require('../models/Curriculo'); // Modelo Sequelize
const router = express.Router();

// Obter o currículo (GET)
router.get('/', async (req, res) => {
  try {
    const curriculo = await Curriculo.findAll();
    res.json(curriculo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o currículo.' });
  }
});

// Criar informações no currículo (POST)
router.post('/', async (req, res) => {
  try {
    const novoCurriculo = await Curriculo.create(req.body);
    res.status(201).json(novoCurriculo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar o currículo.' });
  }
});

// Atualizar informações no currículo (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Curriculo.update(req.body, { where: { id } });
    if (updated) {
      const updatedCurriculo = await Curriculo.findByPk(id);
      res.json(updatedCurriculo);
    } else {
      res.status(404).json({ error: 'Currículo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o currículo.' });
  }
});

// Excluir informações no currículo (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Curriculo.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // Sucesso sem conteúdo
    } else {
      res.status(404).json({ error: 'Currículo não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o currículo.' });
  }
});

module.exports = router;
