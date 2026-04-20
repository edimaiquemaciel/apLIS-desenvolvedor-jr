import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../services/api';
import { getPacienteSchema } from '../schemas/pacienteSchema';

function Pacientes() {
    const { t } = useTranslation();
    const [pacientes, setPacientes] = useState([]);
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
        resolver: zodResolver(getPacienteSchema(t)),
        shouldFocusError: false,
        defaultValues: { nome: '', dataNascimento: '', carteirinha: '', cpf: '' },
    });

    // Buscar pacientes
    useEffect(() => {
        getPacientes()
            .then((response) => setPacientes(Array.isArray(response.data) ? response.data : []))
            .catch(() => setMensagem(t('pacientes.erroBuscar')));
    }, [recarregar, t]);

    const handleEditar = (paciente) => {
        setMensagem('');
        clearErrors();
        setEditando(paciente.id);
        setValue('nome', paciente.nome);
        setValue('dataNascimento', paciente.dataNascimento ? paciente.dataNascimento.split('T')[0] : '');
        setValue('carteirinha', paciente.carteirinha);
        setValue('cpf', paciente.cpf);
    };

    const handleCancelar = () => {
        setEditando(null);
        setMensagem('');
        clearErrors();
        reset();
    };

    async function handleDeletar(id) {
        if (!window.confirm(t('pacientes.confirmDeletar'))) return;
        try {
            await deletePaciente(id);
            setMensagem(t('pacientes.deletadoSucesso'));
            setRecarregar(p => p + 1);
        } catch {
            setMensagem(t('pacientes.erroDeletar'));
        }
    }

    async function onSubmit(data) {
        setMensagem('');
        try {
            if (editando) {
                await updatePaciente(editando, data);
                setMensagem(t('pacientes.atualizadoSucesso'));
            } else {
                await createPaciente(data);
                setMensagem(t('pacientes.cadastradoSucesso'));
            }
            
            setEditando(null);
            reset();
            clearErrors();
            setRecarregar(p => p + 1);
        } catch (error) {
            setMensagem(error.response?.data?.message || t('pacientes.erroSalvar'));
        }
    }

    // Estilos consistentes
    const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', fontSize: '16px', boxSizing: 'border-box' };
    const errorStyle = { color: '#E24B4A', fontSize: '13px', marginTop: '4px', fontWeight: 'bold' };

    return (
        <div style={{ padding: '24px', flex: 1 }}>
            <h1 style={{ marginBottom: '24px' }}>{t('pacientes.titulo')}</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginBottom: '40px' }}>
                
                {/* Nome */}
                <div>
                    <input {...register('nome')} placeholder={t('pacientes.nome')} style={inputStyle} />
                    {errors.nome && <p style={errorStyle}>{errors.nome.message}</p>}
                </div>

                {/* Data de Nascimento */}
                <div>
                    <label style={{ fontSize: '14px', color: '#666' }}>{t('pacientes.dataNascimento')}</label>
                    <input type="date" {...register('dataNascimento')} style={inputStyle} />
                    {errors.dataNascimento && <p style={errorStyle}>{errors.dataNascimento.message}</p>}
                </div>

                {/* Carteirinha */}
                <div>
                    <input {...register('carteirinha')} placeholder={t('pacientes.carteirinha')} style={inputStyle} />
                    {errors.carteirinha && <p style={errorStyle}>{errors.carteirinha.message}</p>}
                </div>

                {/* CPF com Máscara */}
                <div>
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <PatternFormat
                                format="###.###.###-##"
                                mask="_"
                                value={value}
                                getInputRef={ref}
                                onValueChange={(values) => onChange(values.value)}
                                placeholder={t('pacientes.cpf')}
                                style={inputStyle}
                            />
                        )}
                    />
                    {errors.cpf && !mensagem.includes('sucesso') && (
                        <p style={errorStyle}>{errors.cpf.message}</p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '12px', background: '#534AB7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {isSubmitting ? t('pacientes.salvando') : editando ? t('pacientes.atualizar') : t('pacientes.cadastrar')}
                    </button>
                    {editando && (
                        <button type="button" onClick={handleCancelar} style={{ flex: 1, padding: '12px', background: '#eee', borderRadius: '6px', cursor: 'pointer' }}>
                            {t('pacientes.cancelar')}
                        </button>
                    )}
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

            {/* Tabela de Pacientes */}
            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{t('pacientes.nome')}</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{t('pacientes.dataNascimento')}</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{t('pacientes.carteirinha')}</th>
                            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{t('pacientes.cpf')}</th>
                            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{t('pacientes.acoes')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente) => (
                            <tr key={paciente.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>{paciente.nome}</td>
                                <td style={{ padding: '12px' }}>
                                    {paciente.dataNascimento ? new Date(paciente.dataNascimento).toLocaleDateString('pt-BR') : '-'}
                                </td>
                                <td style={{ padding: '12px' }}>{paciente.carteirinha}</td>
                                <td style={{ padding: '12px' }}>{paciente.cpf}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button onClick={() => handleEditar(paciente)} style={{ marginRight: '8px', padding: '5px 10px', background: '#EF9F27', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t('pacientes.editar')}</button>
                                    <button onClick={() => handleDeletar(paciente.id)} style={{ padding: '5px 10px', background: '#E24B4A', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{t('pacientes.deletar')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pacientes;