const Paciente = require('../Models/Paciente');

class PacienteController {
    async index(req, res) {
        try {
            const paciente = new Paciente();
            const pacientes = await paciente.getAll();
            return res.status(200).json(pacientes);
        } catch (_error) {
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
        } catch (_error) {
            return res.status(500).json({ mensagem: 'Erro ao criar paciente' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, dataNascimento, carteirinha, cpf } = req.body;

            if (!nome || !carteirinha || !cpf) {
                return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, carteirinha, cpf' });
            }

            const paciente = new Paciente();
            await paciente.update(id, { nome, dataNascimento, carteirinha, cpf });

            return res.status(200).json({ mensagem: 'Paciente atualizado com sucesso' });
        } catch (_error) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar paciente' });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            const paciente = new Paciente();
            await paciente.delete(id);

            return res.status(200).json({ mensagem: 'Paciente deletado com sucesso' });
        } catch (_error) {
            return res.status(500).json({ mensagem: 'Erro ao deletar paciente' });
        }
    }
}

module.exports = PacienteController;