const Paciente = require('../Models/Paciente');

class PacienteController {
    async index(req, res) {
        try {
            const paciente = new Paciente();
            const pacientes = await paciente.getAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao buscar pacientes' });
        }
    }

    async store(req, res) {
        try {
            const { nome, dataNascimento, carteirinha, cpf } = req.body;

            if (!nome || !carteirinha || !cpf) {
                return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, carteirinha, cpf' });
            }

            const paciente = new Paciente();
            await paciente.create({ nome, dataNascimento, carteirinha, cpf });

            return res.status(201).json({ mensagem: 'Paciente criado com sucesso' });
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro ao criar paciente' });
        }
    }
}

module.exports = PacienteController;