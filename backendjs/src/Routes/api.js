const express = require('express');
const router = express.Router();
const PacienteController = require('../Controllers/PacienteController');

const controller = new PacienteController();

router.get('/pacientes', (req, res) => controller.index(req, res));
router.post('/pacientes', (req, res) => controller.store(req, res));

module.exports = router;