import { useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import { getMedicoSchema } from '../schemas/medicoSchema';
import BaseFormDialog from './ui/BaseFormDialog';
import DialogActionButtons from './ui/DialogActionButtons';
import FormTextField from './ui/FormTextField';

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

function EditMedicoDialog({ aberto, medico, onConfirm, onCancel, t }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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
    <BaseFormDialog
      aberto={aberto}
      onCancel={onCancel}
      title={t('medicos.editar')}
      formId="edit-medico-form"
      onSubmit={handleSubmit(onConfirm)}
      actionButtons={
        <DialogActionButtons
          onCancel={onCancel}
          cancelLabel={t('medicos.cancelar')}
          confirmLabel={t('medicos.atualizar')}
          savingLabel={t('medicos.salvando')}
          formId="edit-medico-form"
          isSubmitting={isSubmitting}
        />
      }
    >
      <FormTextField
        {...register('nome')}
        label={t('medicos.nome')}
        error={errors.nome}
        helperText={errors.nome?.message}
      />

      <Controller
        name="CRM"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <PatternFormat
            format="######"
            value={value}
            getInputRef={ref}
            onValueChange={(values) => onChange(values.value)}
            customInput={TextField}
            label={t('medicos.crm')}
            error={!!errors.CRM}
            helperText={errors.CRM?.message}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
        )}
      />

      <Controller
        name="UFCRM"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label={t('medicos.uf')}
            error={!!errors.UFCRM}
            helperText={errors.UFCRM?.message}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          >
            <MenuItem value="">{t('medicos.selecioneUf')}</MenuItem>
            {ESTADOS_BR.map((uf) => (
              <MenuItem key={uf} value={uf}>{uf}</MenuItem>
            ))}
          </TextField>
        )}
      />
    </BaseFormDialog>
  );
}

export default EditMedicoDialog;