import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getPacienteSchema } from '../schemas/pacienteSchema';
import BaseFormDialog from './ui/BaseFormDialog';
import DialogActionButtons from './ui/DialogActionButtons';
import FormTextField from './ui/FormTextField';

function EditPacienteDialog({ aberto, paciente, onConfirm, onCancel, t }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getPacienteSchema(t)),
    shouldFocusError: false,
    defaultValues: { nome: '', dataNascimento: '', carteirinha: '', cpf: '' },
  });

  useEffect(() => {
    if (aberto && paciente) {
      reset({
        nome: paciente.nome || '',
        dataNascimento: paciente.dataNascimento
          ? paciente.dataNascimento.split('T')[0]
          : '',
        carteirinha: paciente.carteirinha || '',
        cpf: paciente.cpf || '',
      });
    }
  }, [aberto, paciente, reset]);

  return (
    <BaseFormDialog
      aberto={aberto}
      onCancel={onCancel}
      title={t('pacientes.editar')}
      formId="edit-paciente-form"
      onSubmit={handleSubmit(onConfirm)}
      actionButtons={
        <DialogActionButtons
          onCancel={onCancel}
          cancelLabel={t('pacientes.cancelar')}
          confirmLabel={t('pacientes.atualizar')}
          savingLabel={t('pacientes.salvando')}
          formId="edit-paciente-form"
          isSubmitting={isSubmitting}
        />
      }
    >
      <FormTextField
        {...register('nome')}
        label={t('pacientes.nome')}
        error={errors.nome}
        helperText={errors.nome?.message}
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
                sx: {'& .MuiOutlinedInput-root': { borderRadius: '10px'  }},
              },
            }}
          />
        )}
      />

      <FormTextField
        {...register('carteirinha')}
        label={t('pacientes.carteirinha')}
        error={errors.carteirinha}
        helperText={errors.carteirinha?.message}
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
            label={t('pacientes.cpf')}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
        )}
      />
    </BaseFormDialog>
  );
}

export default EditPacienteDialog;