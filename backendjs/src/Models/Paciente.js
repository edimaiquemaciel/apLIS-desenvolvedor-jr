const { getConnection } = require('../Database/connection');

class Paciente {
    async getAll() {
        const db = await getConnection();
        const [rows] = await db.query('SELECT * FROM pacientes');
        return rows;
    }

    async create(data) {
        const db = await getConnection();
        await db.query(
            'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
            [data.nome, data.dataNascimento, data.carteirinha, data.cpf]
        );
    }

    async update(id, data) {
        const db = await getConnection();
        await db.query(
            'UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?',
            [data.nome, data.dataNascimento, data.carteirinha, data.cpf, id]
        );
    }

    async delete(id) {
        const db = await getConnection();
        await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
    }
}

module.exports = Paciente;