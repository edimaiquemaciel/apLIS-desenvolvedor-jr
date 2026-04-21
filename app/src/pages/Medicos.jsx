import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getMedicos, createMedico, updateMedico, deleteMedico } from '../services/api';
import { getMedicoSchema } from '../schemas/medicoSchema';
import {
  Box, Button, TextField, MenuItem, Typography,
  TableCell, TableRow, CircularProgress, Chip,
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import EditMedicoDialog from '../components/EditMedicoDialog';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import RowActionButtons from '../components/ui/RowActionButtons';
import { sxCard, sxPrimaryBtn, sxField } from '../constants/muiStyles';

const ESTADOS_BR = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const defaultValues = { nome: '', CRM: '', UFCRM: '' };

function Medicos() {
  const { t } = useTranslation();
  const [medicos, setMedicos] = useState([]);
  const [recarregar, setRecarregar] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [carregando, setCarregando] = useState(true);
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
      .catch(() => showToast(t('medicos.erroBuscar'), 'error'))
      .finally(() => setTimeout(() => setCarregando(false), 600));
  }, [recarregar, t]);

  const resetForm = () => { setFormKey(k => k + 1); reset(defaultValues); clearErrors(); };

  const handleDeletarClick = (id) => setConfirm({ aberto: true, id });
  const handleConfirmDeletar = async () => {
    setConfirm({ aberto: false, id: confirm.id });
    setCarregando(true);
    try {
      await deleteMedico(confirm.id);
      showToast(t('medicos.deletadoSucesso'), 'warning');
      setRecarregar(p => p + 1);
    } catch {
      showToast(t('medicos.erroDeletar'), 'error');
      setCarregando(false);
    }
  };
  const handleCancelDeletar = () => setConfirm({ aberto: false, id: null });

  const handleEditarClick = (medico) => setEditMedicoDialog({ aberto: true, medico });
  const handleConfirmEditar = async (data) => {
    setCarregando(true);
    try {
      await updateMedico(editMedicoDialog.medico.id, data);
      showToast(t('medicos.atualizadoSucesso'), 'info');
      setRecarregar(p => p + 1);
      setEditMedicoDialog({ aberto: false, medico: null });
    } catch (error) {
      showToast(error.response?.data?.message || t('medicos.erroSalvar'), 'error');
      setCarregando(false);
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

  const columns = [
    { label: t('medicos.nome') },
    { label: t('medicos.crm') },
    { label: t('medicos.uf') },
    { label: t('medicos.acoes'), align: 'center' },
  ];

  return (
    <Box sx={{ padding: '32px', flex: 1, background: '#f8faf8', minHeight: '100vh' }}>

      <PageHeader
        icon={<LocalHospitalIcon sx={{ color: '#fff', fontSize: 28 }} />}
        titulo={t('medicos.titulo')}
        count={medicos.length}
        registrado={t('medicos.registrado')}
        registrados={t('medicos.registrados')}
      />

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
                fullWidth size="small"
                sx={sxField}
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
                sx={sxField}
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

      {carregando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#2e7d32' }} />
        </Box>
      ) : medicos.length === 0 ? (
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', py: 8, gap: 1,
          background: '#fff', borderRadius: '16px',
          border: '1px solid #e0e7e1',
          boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
        }}>
          <LocalHospitalIcon sx={{ fontSize: 48, color: '#c8e6c9' }} />
          <Typography sx={{ color: '#78909c', fontWeight: 500 }}>
            {t('medicos.nenhumRegistrado')}
          </Typography>
        </Box>
      ) : (
        <DataTable columns={columns}>
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
                <RowActionButtons
                  onEditar={() => handleEditarClick(medico)}
                  onDeletar={() => handleDeletarClick(medico.id)}
                  editarLabel={t('medicos.editar')}
                  deletarLabel={t('medicos.deletar')}
                />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
      )}

      <Toast aberto={toast.aberto} mensagem={toast.mensagem} tipo={toast.tipo} onClose={closeToast} />
      <ConfirmDialog aberto={confirm.aberto} mensagem={t('medicos.confirmDeletar')} onConfirm={handleConfirmDeletar} onCancel={handleCancelDeletar} />
      <EditMedicoDialog aberto={editMedicoDialog.aberto} medico={editMedicoDialog.medico} onConfirm={handleConfirmEditar} onCancel={handleCancelEditar} t={t} />
    </Box>
  );
}

export default Medicos;