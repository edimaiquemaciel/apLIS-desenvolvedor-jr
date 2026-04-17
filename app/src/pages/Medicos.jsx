import { useState, useEffect } from 'react';
import { getMedicos, createMedico } from '../services/api';

function Medicos() {
    const [medicos, setMedicos] = useState([]);
    const [nome, setNome] = useState('');
    const [crm, setCrm] = useState('');
    const [ufcrm, setUfcrm] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [recarregar, setRecarregar] = useState(0);

    useEffect(() => {
        getMedicos()
            .then((response) => setMedicos(response.data))
            .catch(() => setMensagem('Erro ao buscar médicos'));
    }, [recarregar]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createMedico({ nome, CRM: crm, UFCRM: ufcrm });
            setMensagem('Médico criado com sucesso!');
            setNome('');
            setCrm('');
            setUfcrm('');
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem('Erro ao criar médico');
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1 style={{ marginBottom: '24px' }}>Médicos</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', marginBottom: '32px' }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="UF do CRM"
                    value={ufcrm}
                    onChange={(e) => setUfcrm(e.target.value)}
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
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>CRM</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>UF</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <tr key={medico.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.CRM}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.UFCRM}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Medicos;