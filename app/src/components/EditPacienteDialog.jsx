import { useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getPacienteSchema } from '../schemas/pacienteSchema';

const sxField = { '& .MuiOutlinedInput-root': { borderRadius: '10px' } };

function EditPacienteDialog({ aberto, paciente, onConfirm, onCancel, t }) {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(getPacienteSchema(t)),
        shouldFocusError: false,
        defaultValues: { nome: '', dataNascimento: '', carteirinha: '', cpf: '' },
    });

    useEffect(() => {
        if (aberto && paciente) {
            reset({
                nome: paciente.nome || '',
                dataNascimento: paciente.dataNascimento ? paciente.dataNascimento.split('T')[0] : '',
                carteirinha: paciente.carteirinha || '',
                cpf: paciente.cpf || '',
            });
        }
    }, [aberto, paciente, reset]);

    return (
        <Dialog open={aberto} onClose={onCancel} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700, color: '#2f3f35' }}>{t('pacientes.editar')}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="edit-paciente-form"
                    onSubmit={handleSubmit(onConfirm)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 1 }}
                >
                    <TextField
                        {...register('nome')}
                        label={t('pacientes.nome')}
                        error={!!errors.nome} helperText={errors.nome?.message}
                        fullWidth size="small" InputLabelProps={{ shrink: true }}
                        sx={sxField}
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
                                        sx: sxField,
                                    },
                                }}
                            />
                        )}
                    />

                    <TextField
                        {...register('carteirinha')}
                        label={t('pacientes.carteirinha')}
                        error={!!errors.carteirinha} helperText={errors.carteirinha?.message}
                        fullWidth size="small" InputLabelProps={{ shrink: true }}
                        sx={sxField}
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
                                fullWidth size="small" InputLabelProps={{ shrink: true }}
                                sx={sxField}
                            />
                        )}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button
                    onClick={onCancel} variant="outlined"
                    sx={{ 
                        borderRadius: '10px', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        borderColor: '#e0e7e1', 
                        color: '#78909c', 
                        '&:hover': { borderColor: '#2e7d32', background: '#f1f8f1' } 
                    }}
                >
                    {t('pacientes.cancelar')}
                </Button>
                <Button
                    type="submit" form="edit-paciente-form" variant="contained" disabled={isSubmitting}
                    sx={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                        borderRadius: '10px', textTransform: 'none', fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
                        '&:hover': { background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)' }
                    }}
                    startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                >
                    {isSubmitting ? t('pacientes.salvando') : t('pacientes.atualizar')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditPacienteDialog;