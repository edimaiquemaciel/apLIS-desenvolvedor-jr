import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../services/api';
import { getPacienteSchema } from '../schemas/pacienteSchema';
import {
    Box, Button, TextField, Typography,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import EditPacienteDialog from '../components/EditPacienteDialog';

const defaultValues = { nome: '', dataNascimento: '', carteirinha: '', cpf: '' };

const sxCard = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
    border: '1px solid #e0e7e1',
    p: 3,
    mb: 4,
};

const sxPrimaryBtn = {
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    borderRadius: '10px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    py: 1.2,
    boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
    '&:hover': {
        background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
        boxShadow: '0 6px 16px rgba(46,125,50,0.35)',
    },
};

function Pacientes() {
    const { t } = useTranslation();
    const [pacientes, setPacientes] = useState([]);
    const [recarregar, setRecarregar] = useState(0);
    const [formKey, setFormKey] = useState(0);
    const [toast, setToast] = useState({ aberto: false, mensagem: '', tipo: 'success' });
    const [confirm, setConfirm] = useState({ aberto: false, id: null });
    const [editPacienteDialog, setEditPacienteDialog] = useState({ aberto: false, paciente: null });

    const {
        register, handleSubmit, control,
        formState: { errors, isSubmitting },
        reset, clearErrors,
    } = useForm({
        resolver: zodResolver(getPacienteSchema(t)),
        shouldFocusError: false,
        defaultValues,
    });

    const showToast = (mensagem, tipo = 'success') => setToast({ aberto: true, mensagem, tipo });
    const closeToast = () => setToast(prev => ({ ...prev, aberto: false }));

    useEffect(() => {
        getPacientes()
            .then((response) => setPacientes(Array.isArray(response.data) ? response.data : []))
            .catch(() => showToast(t('pacientes.erroBuscar'), 'error'));
    }, [recarregar, t]);

    const resetForm = () => { setFormKey(k => k + 1); reset(defaultValues); clearErrors(); };

    const handleDeletarClick = (id) => setConfirm({ aberto: true, id });
    const handleConfirmDeletar = async () => {
        try {
            await deletePaciente(confirm.id);
            showToast(t('pacientes.deletadoSucesso'), 'warning');
            setRecarregar(p => p + 1);
        } catch {
            showToast(t('pacientes.erroDeletar'), 'error');
        } finally {
            setConfirm({ aberto: false, id: null });
        }
    };
    const handleCancelDeletar = () => setConfirm({ aberto: false, id: null });

    const handleEditarClick = (paciente) => setEditPacienteDialog({ aberto: true, paciente });
    const handleConfirmEditar = async (data) => {
        try {
            await updatePaciente(editPacienteDialog.paciente.id, data);
            showToast(t('pacientes.atualizadoSucesso'), 'info');
            setRecarregar(p => p + 1);
            setEditPacienteDialog({ aberto: false, paciente: null });
        } catch (error) {
            showToast(error.response?.data?.message || t('pacientes.erroSalvar'), 'error');
        }
    };
    const handleCancelEditar = () => setEditPacienteDialog({ aberto: false, paciente: null });

    async function onSubmit(data) {
        try {
            await createPaciente(data);
            showToast(t('pacientes.cadastradoSucesso'), 'success');
            resetForm();
            setRecarregar(p => p + 1);
        } catch (error) {
            showToast(error.response?.data?.message || t('pacientes.erroSalvar'), 'error');
        }
    }

    return (
        <Box sx={{ padding: '32px', flex: 1, background: '#f8faf8', minHeight: '100vh' }}>

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{
                    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                    borderRadius: '14px', p: 1.2, display: 'flex', alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(46,125,50,0.3)'
                }}>
                    <PeopleAltIcon sx={{ color: '#fff', fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2f3f35', lineHeight: 1.2 }}>
                        {t('pacientes.titulo')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78909c', mt: 0.3 }}>
                        {pacientes.length} {pacientes.length === 1 ? t('pacientes.registrado') : t('pacientes.registrados')}
                    </Typography>
                </Box>
            </Box>

            {/* Formulário */}
            <Box sx={sxCard}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <PersonAddAltIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2f3f35' }}>
                        {t('pacientes.cadastrar')}
                    </Typography>
                </Box>
                <Box
                    key={formKey}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
                >
                    <TextField
                        {...register('nome')}
                        label={t('pacientes.nome')}
                        error={!!errors.nome} helperText={errors.nome?.message}
                        fullWidth size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />

                    <Controller
                        name="dataNascimento"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                label={t('pacientes.dataNascimento')}
                                value={value ? dayjs(value) : null}
                                onChange={(date) => onChange(date ? date.format('YYYY-MM-DD') : '')}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        error: !!errors.dataNascimento,
                                        helperText: errors.dataNascimento?.message,
                                        sx: { '& .MuiOutlinedInput-root': { borderRadius: '10px' } },
                                    },
                                }}
                            />
                        )}
                    />

                    <TextField
                        {...register('carteirinha')}
                        label={t('pacientes.carteirinha')}
                        error={!!errors.carteirinha} helperText={errors.carteirinha?.message}
                        fullWidth size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />

                    <Controller
                        name="cpf" control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <PatternFormat
                                format="###.###.###-##" mask="_"
                                value={value} getInputRef={ref}
                                onValueChange={(values) => onChange(values.value)}
                                customInput={TextField}
                                label={t('pacientes.cpf')}
                                error={!!errors.cpf} helperText={errors.cpf?.message}
                                fullWidth size="small"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                            />
                        )}
                    />

                    <Button
                        type="submit" variant="contained" disabled={isSubmitting} fullWidth
                        sx={sxPrimaryBtn}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {isSubmitting ? t('pacientes.salvando') : t('pacientes.cadastrar')}
                    </Button>
                </Box>
            </Box>

            {/* Tabela */}
            <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 2px 12px rgba(46,125,50,0.08)', border: '1px solid #e0e7e1', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' }}>
                            {[t('pacientes.nome'), t('pacientes.dataNascimento'), t('pacientes.carteirinha'), t('pacientes.cpf')].map(col => (
                                <TableCell key={col} sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{col}</TableCell>
                            ))}
                            <TableCell align="center" sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('pacientes.acoes')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map((paciente, index) => (
                            <TableRow key={paciente.id} sx={{
                                background: index % 2 === 0 ? '#fff' : '#f1f8f1',
                                '&:hover': { background: '#e8f5e9' },
                                transition: 'background 0.15s ease',
                            }}>
                                <TableCell sx={{ fontWeight: 500, color: '#2f3f35' }}>{paciente.nome}</TableCell>
                                <TableCell sx={{ color: '#2e7d32', fontWeight: 500 }}>
                                    {paciente.dataNascimento ? new Date(paciente.dataNascimento).toLocaleDateString('pt-BR') : '-'}
                                </TableCell>
                                <TableCell>{paciente.carteirinha}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace', letterSpacing: '0.03em' }}>{paciente.cpf}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => handleEditarClick(paciente)}
                                        size="small" variant="contained"
                                        startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
                                        sx={{
                                            mr: 1, background: '#EF9F27', borderRadius: '8px',
                                            textTransform: 'none', fontWeight: 600, fontSize: '0.8rem',
                                            boxShadow: 'none',
                                            '&:hover': { background: '#d4891a', boxShadow: '0 4px 10px rgba(239,159,39,0.3)' }
                                        }}
                                    >
                                        {t('pacientes.editar')}
                                    </Button>
                                    <Button
                                        onClick={() => handleDeletarClick(paciente.id)}
                                        size="small" variant="contained"
                                        startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
                                        sx={{
                                            background: '#E24B4A', borderRadius: '8px',
                                            textTransform: 'none', fontWeight: 600, fontSize: '0.8rem',
                                            boxShadow: 'none',
                                            '&:hover': { background: '#c73d3c', boxShadow: '0 4px 10px rgba(226,75,74,0.3)' }
                                        }}
                                    >
                                        {t('pacientes.deletar')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Toast aberto={toast.aberto} mensagem={toast.mensagem} tipo={toast.tipo} onClose={closeToast} />
            <ConfirmDialog aberto={confirm.aberto} mensagem={t('pacientes.confirmDeletar')} onConfirm={handleConfirmDeletar} onCancel={handleCancelDeletar} />
            <EditPacienteDialog aberto={editPacienteDialog.aberto} paciente={editPacienteDialog.paciente} onConfirm={handleConfirmEditar} onCancel={handleCancelEditar} t={t} />
        </Box>
    );
}

export default Pacientes;