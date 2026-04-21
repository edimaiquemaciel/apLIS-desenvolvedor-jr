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
  TableCell, TableRow, CircularProgress,
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import EditPacienteDialog from '../components/EditPacienteDialog';
import PageHeader from '../components/ui/PageHeader';
import DataTable from '../components/ui/DataTable';
import RowActionButtons from '../components/ui/RowActionButtons';
import { sxCard, sxPrimaryBtn, sxField } from '../constants/muiStyles';

const defaultValues = { nome: '', dataNascimento: '', carteirinha: '', cpf: '' };

function Pacientes() {
  const { t } = useTranslation();
  const [pacientes, setPacientes] = useState([]);
  const [recarregar, setRecarregar] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [carregando, setCarregando] = useState(true);
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
      .catch(() => showToast(t('pacientes.erroBuscar'), 'error'))
      .finally(() => setTimeout(() => setCarregando(false), 600));
  }, [recarregar, t]);

  const resetForm = () => { setFormKey(k => k + 1); reset(defaultValues); clearErrors(); };

  const handleDeletarClick = (id) => setConfirm({ aberto: true, id });
  const handleConfirmDeletar = async () => {
    setConfirm({ aberto: false, id: confirm.id });
    setCarregando(true);
    try {
      await deletePaciente(confirm.id);
      showToast(t('pacientes.deletadoSucesso'), 'warning');
      setRecarregar(p => p + 1);
    } catch {
      showToast(t('pacientes.erroDeletar'), 'error');
      setCarregando(false);
    }
  };
  const handleCancelDeletar = () => setConfirm({ aberto: false, id: null });

  const handleEditarClick = (paciente) => setEditPacienteDialog({ aberto: true, paciente });
  const handleConfirmEditar = async (data) => {
    setCarregando(true);
    try {
      await updatePaciente(editPacienteDialog.paciente.id, data);
      showToast(t('pacientes.atualizadoSucesso'), 'info');
      setRecarregar(p => p + 1);
      setEditPacienteDialog({ aberto: false, paciente: null });
    } catch (error) {
      showToast(error.response?.data?.message || t('pacientes.erroSalvar'), 'error');
      setCarregando(false);
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

  const columns = [
    { label: t('pacientes.nome') },
    { label: t('pacientes.dataNascimento') },
    { label: t('pacientes.carteirinha') },
    { label: t('pacientes.cpf') },
    { label: t('pacientes.acoes'), align: 'center' },
  ];

  return (
    <Box
      sx={{
        padding: "32px",
        flex: 1,
        background: "#f8faf8",
        minHeight: "100vh",
      }}
    >
      <PageHeader
        icon={<PeopleAltIcon sx={{ color: "#fff", fontSize: 28 }} />}
        titulo={t("pacientes.titulo")}
        count={pacientes.length}
        registrado={t("pacientes.registrado")}
        registrados={t("pacientes.registrados")}
      />

      <Box sx={sxCard}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <PersonAddAltIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#2f3f35" }}
          >
            {t("pacientes.cadastrar")}
          </Typography>
        </Box>
        <Box
          key={formKey}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
          }}
        >
          <TextField
            {...register("nome")}
            label={t("pacientes.nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            fullWidth
            size="small"
            sx={sxField}
          />
          <Controller
            name="dataNascimento"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label={t("pacientes.dataNascimento")}
                value={value ? dayjs(value) : null}
                onChange={(date) =>
                  onChange(date ? date.format("YYYY-MM-DD") : "")
                }
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    size: "small",
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
            {...register("carteirinha")}
            label={t("pacientes.carteirinha")}
            error={!!errors.carteirinha}
            helperText={errors.carteirinha?.message}
            fullWidth
            size="small"
            sx={sxField}
          />
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
                customInput={TextField}
                label={t("pacientes.cpf")}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                fullWidth
                size="small"
                sx={sxField}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={sxPrimaryBtn}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? t("pacientes.salvando") : t("pacientes.cadastrar")}
          </Button>
        </Box>
      </Box>

      {carregando ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#2e7d32" }} />
        </Box>
      ) : pacientes.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            gap: 1,
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e0e7e1",
            boxShadow: "0 2px 12px rgba(46,125,50,0.08)",
          }}
        >
          <PeopleAltIcon sx={{ fontSize: 48, color: "#c8e6c9" }} />
          <Typography sx={{ color: "#78909c", fontWeight: 500 }}>
            {t("pacientes.nenhumRegistrado")}
          </Typography>
        </Box>
      ) : (
        <DataTable columns={columns}>
          {pacientes.map((paciente, index) => (
            <TableRow
              key={paciente.id}
              sx={{
                background: index % 2 === 0 ? "#fff" : "#f1f8f1",
                "&:hover": { background: "#e8f5e9" },
                transition: "background 0.15s ease",
              }}
            >
              <TableCell sx={{ fontWeight: 500, color: "#2f3f35" }}>
                {paciente.nome}
              </TableCell>
              <TableCell sx={{ color: "#2e7d32", fontWeight: 500 }}>
                {paciente.dataNascimento
                  ? new Date(paciente.dataNascimento).toLocaleDateString(
                      "pt-BR",
                    )
                  : "-"}
              </TableCell>
              <TableCell>{paciente.carteirinha}</TableCell>
              <TableCell
                sx={{ fontFamily: "monospace", letterSpacing: "0.03em" }}
              >
                {paciente.cpf}
              </TableCell>
              <TableCell align="center">
                <RowActionButtons
                  onEditar={() => handleEditarClick(paciente)}
                  onDeletar={() => handleDeletarClick(paciente.id)}
                  editarLabel={t("pacientes.editar")}
                  deletarLabel={t("pacientes.deletar")}
                />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
      )}

      <Toast
        aberto={toast.aberto}
        mensagem={toast.mensagem}
        tipo={toast.tipo}
        onClose={closeToast}
      />
      <ConfirmDialog
        aberto={confirm.aberto}
        mensagem={t("pacientes.confirmDeletar")}
        onConfirm={handleConfirmDeletar}
        onCancel={handleCancelDeletar}
      />
      <EditPacienteDialog
        aberto={editPacienteDialog.aberto}
        paciente={editPacienteDialog.paciente}
        onConfirm={handleConfirmEditar}
        onCancel={handleCancelEditar}
        t={t}
      />
    </Box>
  );
}

export default Pacientes;