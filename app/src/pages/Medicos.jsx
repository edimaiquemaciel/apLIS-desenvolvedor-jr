import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getMedicos, createMedico, updateMedico, deleteMedico } from '../services/api';
import { getMedicoSchema } from '../schemas/medicoSchema';
import {
    Box, Button, TextField, MenuItem, Typography,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, CircularProgress, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import EditMedicoDialog from '../components/EditMedicoDialog';

const ESTADOS_BR = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const defaultValues = { nome: '', CRM: '', UFCRM: '' };

const sxCard = {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(46,125,50,0.08)', // Sombra esverdeada leve
    border: '1px solid #e0e7e1', // Borda verde suave
    p: 3,
    mb: 4,
};

const sxPrimaryBtn = {
    background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', // Gradiente verde
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

function Medicos() {
    const { t } = useTranslation();
    const [medicos, setMedicos] = useState([]);
    const [recarregar, setRecarregar] = useState(0);
    const [formKey, setFormKey] = useState(0);
    const [toast, setToast] = useState({ aberto: false, mensagem: '', tipo: 'success' });
    const [confirm, setConfirm] = useState({ aberto: false, id: null });
    const [editMedicoDialog, setEditMedicoDialog] = useState({ aberto: false, medico: null });

    const {
        register, handleSubmit, control,
        formState: { errors, isSubmitting },
        reset, clearErrors,
    } = useForm({
        resolver: zodResolver(getMedicoSchema(t)),
        shouldFocusError: false,
        defaultValues,
    });

    const showToast = (mensagem, tipo = 'success') => setToast({ aberto: true, mensagem, tipo });
    const closeToast = () => setToast(prev => ({ ...prev, aberto: false }));

    useEffect(() => {
        getMedicos()
            .then((response) => setMedicos(Array.isArray(response.data) ? response.data : []))
            .catch(() => showToast(t('medicos.erroBuscar'), 'error'));
    }, [recarregar, t]);

    const resetForm = () => { setFormKey(k => k + 1); reset(defaultValues); clearErrors(); };

    const handleDeletarClick = (id) => setConfirm({ aberto: true, id });
    const handleConfirmDeletar = async () => {
        try {
            await deleteMedico(confirm.id);
            showToast(t('medicos.deletadoSucesso'), 'warning');
            setRecarregar(p => p + 1);
        } catch {
            showToast(t('medicos.erroDeletar'), 'error');
        } finally {
            setConfirm({ aberto: false, id: null });
        }
    };
    const handleCancelDeletar = () => setConfirm({ aberto: false, id: null });

    const handleEditarClick = (medico) => setEditMedicoDialog({ aberto: true, medico });
    const handleConfirmEditar = async (data) => {
        try {
            await updateMedico(editMedicoDialog.medico.id, data);
            showToast(t('medicos.atualizadoSucesso'), 'info');
            setRecarregar(p => p + 1);
            setEditMedicoDialog({ aberto: false, medico: null });
        } catch (error) {
            showToast(error.response?.data?.message || t('medicos.erroSalvar'), 'error');
        }
    };
    const handleCancelEditar = () => setEditMedicoDialog({ aberto: false, medico: null });

    async function onSubmit(data) {
        try {
            await createMedico(data);
            showToast(t('medicos.cadastradoSucesso'), 'success');
            resetForm();
            setRecarregar(p => p + 1);
        } catch (error) {
            showToast(error.response?.data?.message || t('medicos.erroSalvar'), 'error');
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
                    <LocalHospitalIcon sx={{ color: '#fff', fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2f3f35', lineHeight: 1.2 }}>
                        {t('medicos.titulo')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78909c', mt: 0.3 }}>
                        {medicos.length} {medicos.length === 1 ? t('medicos.registrado') : t('medicos.registrados')}
                    </Typography>
                </Box>
            </Box>

            {/* Formulário */}
            <Box sx={sxCard}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <PersonAddAltIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2f3f35' }}>
                        {t('medicos.cadastrar')}
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
                        label={t('medicos.nome')}
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                        fullWidth size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />
                    <Controller
                        name="CRM" control={control}
                        render={({ field: { onChange, value, ref } }) => (
                            <PatternFormat
                                format="######" value={value} getInputRef={ref}
                                onValueChange={(values) => onChange(values.value)}
                                customInput={TextField}
                                label={t('medicos.crm')}
                                error={!!errors.CRM} helperText={errors.CRM?.message}
                                fullWidth size="small"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                            />
                        )}
                    />
                    <Controller
                        name="UFCRM" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field} select label={t('medicos.uf')}
                                error={!!errors.UFCRM} helperText={errors.UFCRM?.message}
                                fullWidth size="small"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                            >
                                <MenuItem value="">{t('medicos.selecioneUf')}</MenuItem>
                                {ESTADOS_BR.map(uf => <MenuItem key={uf} value={uf}>{uf}</MenuItem>)}
                            </TextField>
                        )}
                    />
                    <Button
                        type="submit" variant="contained" disabled={isSubmitting} fullWidth
                        sx={sxPrimaryBtn}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {isSubmitting ? t('medicos.salvando') : t('medicos.cadastrar')}
                    </Button>
                </Box>
            </Box>

            {/* Tabela */}
            <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 2px 12px rgba(46,125,50,0.08)', border: '1px solid #e0e7e1', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' }}>
                            <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('medicos.nome')}</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('medicos.crm')}</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('medicos.uf')}</TableCell>
                            <TableCell align="center" sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('medicos.acoes')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicos.map((medico, index) => (
                            <TableRow key={medico.id} sx={{
                                background: index % 2 === 0 ? '#fff' : '#f1f8f1',
                                '&:hover': { background: '#e8f5e9' },
                                transition: 'background 0.15s ease',
                            }}>
                                <TableCell sx={{ fontWeight: 500, color: '#2f3f35' }}>{medico.nome}</TableCell>
                                <TableCell sx={{ color: '#2e7d32', fontWeight: 600 }}>{medico.CRM}</TableCell>
                                <TableCell>
                                    <Chip label={medico.UFCRM} size="small" sx={{ background: '#e8f5e9', color: '#2e7d32', fontWeight: 700, fontSize: '0.78rem' }} />
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => handleEditarClick(medico)}
                                        size="small" variant="contained"
                                        startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
                                        sx={{
                                            mr: 1, background: '#EF9F27', borderRadius: '8px',
                                            textTransform: 'none', fontWeight: 600, fontSize: '0.8rem',
                                            boxShadow: 'none',
                                            '&:hover': { background: '#d4891a', boxShadow: '0 4px 10px rgba(239,159,39,0.3)' }
                                        }}
                                    >
                                        {t('medicos.editar')}
                                    </Button>
                                    <Button
                                        onClick={() => handleDeletarClick(medico.id)}
                                        size="small" variant="contained"
                                        startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
                                        sx={{
                                            background: '#E24B4A', borderRadius: '8px',
                                            textTransform: 'none', fontWeight: 600, fontSize: '0.8rem',
                                            boxShadow: 'none',
                                            '&:hover': { background: '#c73d3c', boxShadow: '0 4px 10px rgba(226,75,74,0.3)' }
                                        }}
                                    >
                                        {t('medicos.deletar')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Toast aberto={toast.aberto} mensagem={toast.mensagem} tipo={toast.tipo} onClose={closeToast} />
            <ConfirmDialog aberto={confirm.aberto} mensagem={t('medicos.confirmDeletar')} onConfirm={handleConfirmDeletar} onCancel={handleCancelDeletar} />
            <EditMedicoDialog aberto={editMedicoDialog.aberto} medico={editMedicoDialog.medico} onConfirm={handleConfirmEditar} onCancel={handleCancelEditar} t={t} />
        </Box>
    );
}

export default Medicos;