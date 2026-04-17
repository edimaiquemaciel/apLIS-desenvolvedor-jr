const express = require('express');
const router = express.Router();
const PacienteController = require('../Controllers/PacienteController');

const controller = new PacienteController();

router.get('/pacientes', (req, res) => controller.index(req, res));
router.post('/pacientes', (req, res) => controller.store(req, res));
router.put('/pacientes/:id', (req, res) => controller.update(req, res));
router.delete('/pacientes/:id', (req, res) => controller.destroy(req, res));

module.exports = router;