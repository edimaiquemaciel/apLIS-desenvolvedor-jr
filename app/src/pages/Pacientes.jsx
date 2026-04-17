import { useState, useEffect } from 'react';
import { getPacientes, createPaciente } from '../services/api';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [carteirinha, setCarteirinha] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [recarregar, setRecarregar] = useState(0);

    useEffect(() => {
        getPacientes()
            .then((response) => setPacientes(response.data))
            .catch(() => setMensagem('Erro ao buscar pacientes'));
    }, [recarregar]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createPaciente({ nome, dataNascimento, carteirinha, cpf });
            setMensagem('Paciente criado com sucesso!');
            setNome('');
            setDataNascimento('');
            setCarteirinha('');
            setCpf('');
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem('Erro ao criar paciente');
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1 style={{ marginBottom: '24px' }}>Pacientes</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', marginBottom: '32px' }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Carteirinha"
                    value={carteirinha}
                    onChange={(e) => setCarteirinha(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{ padding: '10px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Cadastrar
                </button>
                {mensagem && <p style={{ color: mensagem.includes('Erro') ? 'red' : 'green' }}>{mensagem}</p>}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Nome</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Data de Nascimento</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Carteirinha</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paciente.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
    {paciente.dataNascimento ? new Date(paciente.dataNascimento).toLocaleDateString('pt-BR') : '-'}
</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paciente.carteirinha}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{paciente.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pacientes;