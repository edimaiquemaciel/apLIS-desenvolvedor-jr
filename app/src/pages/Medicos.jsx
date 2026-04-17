import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getMedicos, createMedico, updateMedico, deleteMedico } from '../services/api';

function Medicos() {
    const { t } = useTranslation();
    const [medicos, setMedicos] = useState([]);
    const [nome, setNome] = useState('');
    const [crm, setCrm] = useState('');
    const [ufcrm, setUfcrm] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [recarregar, setRecarregar] = useState(0);
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        getMedicos()
            .then((response) => setMedicos(response.data))
            .catch(() => setMensagem(t('medicos.erroBuscar')));
    }, [recarregar, t]);

    function handleEditar(medico) {
        setEditando(medico.id);
        setNome(medico.nome);
        setCrm(medico.CRM);
        setUfcrm(medico.UFCRM);
    }

    function handleCancelar() {
        setEditando(null);
        setNome('');
        setCrm('');
        setUfcrm('');
        setMensagem('');
    }

    async function handleDeletar(id) {
        if (!confirm(t('medicos.confirmDeletar'))) return;
        try {
            await deleteMedico(id);
            setMensagem(t('medicos.deletadoSucesso'));
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem(t('medicos.erroDeletar'));
            console.error(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editando) {
                await updateMedico(editando, { nome, CRM: crm, UFCRM: ufcrm });
                setMensagem(t('medicos.atualizadoSucesso'));
                setEditando(null);
            } else {
                await createMedico({ nome, CRM: crm, UFCRM: ufcrm });
                setMensagem(t('medicos.cadastradoSucesso'));
            }
            setNome('');
            setCrm('');
            setUfcrm('');
            setRecarregar((prev) => prev + 1);
        } catch (error) {
            setMensagem(t('medicos.erroSalvar'));
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1 style={{ marginBottom: '24px' }}>{t('medicos.titulo')}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', marginBottom: '32px' }}>
                <input
                    type="text"
                    placeholder={t('medicos.nome')}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder={t('medicos.crm')}
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder={t('medicos.uf')}
                    value={ufcrm}
                    onChange={(e) => setUfcrm(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="submit"
                        style={{ flex: 1, padding: '10px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        {editando ? t('medicos.atualizar') : t('medicos.cadastrar')}
                    </button>
                    {editando && (
                        <button
                            type="button"
                            onClick={handleCancelar}
                            style={{ flex: 1, padding: '10px', background: '#888', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        >
                            {t('medicos.cancelar')}
                        </button>
                    )}
                </div>
                {mensagem && <p style={{ color: mensagem.includes('Erro') || mensagem.includes('Error') ? 'red' : 'green' }}>{mensagem}</p>}
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('medicos.nome')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('medicos.crm')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('medicos.uf')}</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>{t('medicos.acoes')}</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico) => (
                        <tr key={medico.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.nome}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.CRM}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{medico.UFCRM}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd', display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleEditar(medico)}
                                    style={{ padding: '6px 12px', background: '#EF9F27', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                >
                                    {t('medicos.editar')}
                                </button>
                                <button
                                    onClick={() => handleDeletar(medico.id)}
                                    style={{ padding: '6px 12px', background: '#E24B4A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                >
                                    {t('medicos.deletar')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Medicos;