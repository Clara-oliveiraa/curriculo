const Curriculo = require('../models/curriculo');

exports.getCurriculo = async (req, res) => {
  const curriculo = await Curriculo.findOne();
  res.json(curriculo);
};

exports.createCurriculo = async (req, res) => {
  const { nome, email, descricao } = req.body;
  const novoCurriculo = await Curriculo.create({ nome, email, descricao });
  res.json(novoCurriculo);
};
