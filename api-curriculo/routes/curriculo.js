const express = require('express');
const router = express.Router();
const { getCurriculo, createCurriculo } = require('../controllers/curriculoController');

router.get('/', getCurriculo);
router.post('/', createCurriculo);

module.exports = router;
