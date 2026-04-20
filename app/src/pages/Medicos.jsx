import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getMedicos, createMedico, updateMedico, deleteMedico } from '../services/api';
import { getMedicoSchema } from '../schemas/medicoSchema';

const ESTADOS_BR = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function Medicos() {
    const { t } = useTranslation();
    const [medicos, setMedicos] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [recarregar, setRecarregar] = useState(0);
    const [editando, setEditando] = useState(null);

    const { 
        register, 
        handleSubmit, 
        control, 
        formState: { errors, isSubmitting }, 
        reset, 
        setValue,
        clearErrors 
    } = useForm({
        resolver: zodResolver(getMedicoSchema(t)),
        shouldFocusError: false, // Trava 1: evita foco automático em erro pós-sucesso
        defaultValues: { nome: '', CRM: '', UFCRM: '' },
    });

    useEffect(() => {
        getMedicos()
            .then((response) => setMedicos(Array.isArray(response.data) ? response.data : []))
            .catch(() => setMensagem(t('medicos.erroBuscar')));
    }, [recarregar, t]);

    const handleEditar = (medico) => {
        setMensagem('');
        clearErrors();
        setEditando(medico.id);
        setValue('nome', medico.nome);
        setValue('CRM', medico.CRM.toString());
        setValue('UFCRM', medico.UFCRM);
    };

    const handleCancelar = () => {
        setEditando(null);
        setMensagem('');
        clearErrors();
        reset({ nome: '', CRM: '', UFCRM: '' });
    };

    async function handleDeletar(id) {
        if (!window.confirm(t('medicos.confirmDeletar'))) return;
        try {
            await deleteMedico(id);
            setMensagem(t('medicos.deletadoSucesso'));
            setRecarregar(p => p + 1);
        } catch {
            setMensagem(t('medicos.erroDeletar'));
        }
    }

    async function onSubmit(data) {
        setMensagem('');
        try {
            if (editando) {
                await updateMedico(editando, data);
                setMensagem(t('medicos.atualizadoSucesso'));
            } else {
                await createMedico(data);
                setMensagem(t('medicos.cadastradoSucesso'));
            }
            
            // Trava 2 e 3: Limpeza profunda do formulário e dos erros de validação
            setEditando(null);
            reset({ nome: '', CRM: '', UFCRM: '' }); 
            clearErrors(); 
            
            setRecarregar(p => p + 1);
        } catch (error) {
            setMensagem(error.response?.data?.message || t('medicos.erroSalvar'));
        }
    }

    const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', fontSize: '16px', boxSizing: 'border-box' };
    const errorStyle = { color: '#E24B4A', fontSize: '13px', marginTop: '4px', fontWeight: 'bold' };

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1>{t('medicos.titulo')}</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginBottom: '40px' }}>
                <div>
                    <input {...register('nome')} placeholder={t('medicos.nome')} style={inputStyle} />
                    {errors.nome && <p style={errorStyle}>{errors.nome.message}</p>}
                </div>

                <div>
                    <Controller
                        name="CRM"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <PatternFormat
                                format="######"
                                value={value}
                                getInputRef={ref}
                                onValueChange={(values) => onChange(values.value)}
                                placeholder={t('medicos.crm')}
                                style={inputStyle}
                            />
                        )}
                    />
                    {/* Só exibe o erro se o formulário não estiver processando um sucesso */}
                    {errors.CRM && !mensagem.includes('sucesso') && (
                        <p style={errorStyle}>{errors.CRM.message}</p>
                    )}
                </div>

                <div>
                    <select {...register('UFCRM')} style={{ ...inputStyle, background: '#fff' }}>
                        <option value="">{t('medicos.selecioneUf')}</option>
                        {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    {errors.UFCRM && !mensagem.includes('sucesso') && (
                        <p style={errorStyle}>{errors.UFCRM.message}</p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '12px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {isSubmitting ? t('medicos.salvando') : editando ? t('medicos.atualizar') : t('medicos.cadastrar')}
                    </button>
                    {editando && <button type="button" onClick={handleCancelar} style={{ flex: 1, padding: '12px', background: '#eee', borderRadius: '6px' }}>{t('medicos.cancelar')}</button>}
                </div>

                {mensagem && (
                    <p style={{ 
                        color: mensagem.includes('sucesso') || mensagem.includes('successfully') ? '#28a745' : '#dc3545', 
                        textAlign: 'center', 
                        fontWeight: 'bold' 
                    }}>
                        {mensagem}
                    </p>
                )}
            </form>

            {/* TABELA ... (permanece igual) */}
            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>{t('medicos.nome')}</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>{t('medicos.crm')}</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>{t('medicos.uf')}</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>{t('medicos.acoes')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos.map((medico) => (
                            <tr key={medico.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>{medico.nome}</td>
                                <td style={{ padding: '12px' }}>{medico.CRM}</td>
                                <td style={{ padding: '12px' }}>{medico.UFCRM}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button onClick={() => handleEditar(medico)} style={{ marginRight: '8px', padding: '5px 10px', background: '#EF9F27', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t('medicos.editar')}</button>
                                    <button onClick={() => handleDeletar(medico.id)} style={{ padding: '5px 10px', background: '#E24B4A', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t('medicos.deletar')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Medicos;