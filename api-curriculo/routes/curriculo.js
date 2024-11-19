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

// Atualizar um currículo existente (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    // Busca o currículo pelo ID
    const curriculo = await Curriculo.findByPk(id);

    if (!curriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado.' });
    }

    // Atualiza o currículo
    curriculo.descricao = descricao;
    await curriculo.save();

    return res.json(curriculo); // Retorna o currículo atualizado
  } catch (error) {
    console.error('Erro ao atualizar currículo:', error);
    return res.status(500).json({ error: 'Erro ao atualizar currículo' });
  }
});

module.exports = router;

// Excluir um currículo existente (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const curriculo = await Curriculo.findByPk(id);

    if (!curriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado.' });
    }

    await curriculo.destroy(); // Deleta o currículo

    return res.status(200).json({ message: 'Currículo excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir currículo:', error);
    return res.status(500).json({ error: 'Erro ao excluir currículo' });
  }
});


module.exports = router;
