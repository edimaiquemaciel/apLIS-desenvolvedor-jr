import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../services/api';

function Pacientes() {
    const { t } = useTranslation();
    const [pacientes, setPacientes] = useState([]);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [carteirinha, setCarteirinha] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [recarregar, setRecarregar] = useState(0);
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        getPacientes()
            .then((response) => setPacientes(response.data))
            .catch(() => setMensagem(t('pacientes.erroBuscar')));
    }, [recarregar, t]);

    function handleEditar(paciente) {
        setEditando(paciente.id);
        setNome(paciente.nome);
        setDataNascimento(paciente.dataNascimento ? paciente.dataNascimento.split('T')[0] : '');
        setCarteirinha(paciente.carteirinha);
        setCpf(paciente.cpf);
    }

    function handleCancelar() {
        setEditando(null);
        setNome('');
        setDataNascimento('');
        setCarteirinha('');
        setCpf('');
        setMensagem('');
    }

    async function handleDeletar(id) {
        if (!confirm(t('pacientes.confirmDeletar'))) return;
        try {
            await deletePaciente(id);
            setMensagem(t('pacientes.deletadoSucesso'));
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem(t('pacientes.erroDeletar'));
            console.error(error);
            
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editando) {
                await updatePaciente(editando, { nome, dataNascimento, carteirinha, cpf });
                setMensagem(t('pacientes.atualizadoSucesso'));
                setEditando(null);
            } else {
                await createPaciente({ nome, dataNascimento, carteirinha, cpf });
                setMensagem(t('pacientes.cadastradoSucesso'));
            }
            setNome('');
            setDataNascimento('');
            setCarteirinha('');
            setCpf('');
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem(t('pacientes.erroSalvar'));
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1 style={{ marginBottom: '24px' }}>{t('pacientes.titulo')}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', marginBottom: '32px' }}>
                <input
                    type="text"
                    placeholder={t('pacientes.nome')}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder={t('pacientes.carteirinha')}
                    value={carteirinha}
                    onChange={(e) => setCarteirinha(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder={t('pacientes.cpf')}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="submit"
                        style={{ flex: 1, padding: '10px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        {editando ? t('pacientes.atualizar') : t('pacientes.cadastrar')}
                    </button>
                    {editando && (
                        <button
                            type="button"
                            onClick={handleCancelar}
                            style={{ flex: 1, padding: '10px', background: '#888', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        >
                            {t('pacientes.cancelar')}
                        </button>
                    )}
                </div>
                {mensagem && <p style={{ color: mensagem.includes('Erro') || mensagem.includes('Error') ? 'red' : 'green' }}>{mensagem}</p>}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('pacientes.nome')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('pacientes.dataNascimento')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('pacientes.carteirinha')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('pacientes.cpf')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('pacientes.acoes')}</th>
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
                            <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleEditar(paciente)}
                                    style={{ padding: '6px 12px', background: '#EF9F27', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                >
                                    {t('pacientes.editar')}
                                </button>
                                <button
                                    onClick={() => handleDeletar(paciente.id)}
                                    style={{ padding: '6px 12px', background: '#E24B4A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                >
                                    {t('pacientes.deletar')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pacientes;