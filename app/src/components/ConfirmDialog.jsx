import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import DialogActionButtons from './ui/DialogActionButtons';

function ConfirmDialog({
  aberto,
  titulo = 'Confirmação',
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={aberto} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700, color: '#2f3f35' }}>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#5f6f65' }}>{mensagem}</DialogContentText>
      </DialogContent>
      <DialogActionButtons
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelLabel={textoCancelar}
        confirmLabel={textoConfirmar}
        confirmType="button"
        isDestructive
      />
    </Dialog>
  );
}

export default ConfirmDialog;