import { useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Box, CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getMedicoSchema } from '../schemas/medicoSchema';

const ESTADOS_BR = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const sxField = { '& .MuiOutlinedInput-root': { borderRadius: '10px' } };

function EditMedicoDialog({ aberto, medico, onConfirm, onCancel, t }) {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(getMedicoSchema(t)),
        shouldFocusError: false,
        defaultValues: { nome: '', CRM: '', UFCRM: '' },
    });

    useEffect(() => {
        if (aberto && medico) {
            reset({
                nome: medico.nome || '',
                CRM: medico.CRM?.toString() || '',
                UFCRM: medico.UFCRM || '',
            });
        }
    }, [aberto, medico, reset]);

    return (
        <Dialog open={aberto} onClose={onCancel} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700, color: '#2f3f35' }}>{t('medicos.editar')}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    id="edit-medico-form"
                    onSubmit={handleSubmit(onConfirm)}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 1 }}
                >
                    <TextField
                        {...register('nome')}
                        label={t('medicos.nome')}
                        error={!!errors.nome} helperText={errors.nome?.message}
                        fullWidth size="small" InputLabelProps={{ shrink: true }}
                        sx={sxField}
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
                                fullWidth size="small" InputLabelProps={{ shrink: true }}
                                sx={sxField}
                            />
                        )}
                    />

                    <Controller
                        name="UFCRM" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field} select
                                label={t('medicos.uf')}
                                error={!!errors.UFCRM} helperText={errors.UFCRM?.message}
                                fullWidth size="small" InputLabelProps={{ shrink: true }}
                                sx={sxField}
                            >
                                <MenuItem value="">{t('medicos.selecioneUf')}</MenuItem>
                                {ESTADOS_BR.map(uf => (
                                    <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                ))}
                            </TextField>
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
                        borderColor: '#e0e7e1', // Cor da borda da Sidebar
                        color: '#78909c',       // Cor do ícone secundário da Sidebar
                        '&:hover': { borderColor: '#2e7d32', background: '#f1f8f1' } 
                    }}
                >
                    {t('medicos.cancelar')}
                </Button>
                <Button
                    type="submit" form="edit-medico-form" variant="contained" disabled={isSubmitting}
                    sx={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', // Gradiente verde saúde
                        borderRadius: '10px', textTransform: 'none', fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
                        '&:hover': { background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)' }
                    }}
                    startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                >
                    {isSubmitting ? t('medicos.salvando') : t('medicos.atualizar')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditMedicoDialog;