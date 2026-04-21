import { DialogActions, Button, CircularProgress } from '@mui/material';

function DialogActionButtons({
  onCancel,
  cancelLabel,
  confirmLabel,
  confirmType = 'submit',
  formId,
  isSubmitting = false,
  isDestructive = false,
  savingLabel,
  onConfirm,
}) {
  return (
    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button
        onClick={onCancel}
        variant="outlined"
        sx={{
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 600,
          borderColor: '#e0e7e1',
          color: '#78909c',
          '&:hover': { borderColor: '#2e7d32', background: '#f1f8f1' },
        }}
      >
        {cancelLabel}
      </Button>
      <Button
        type={confirmType}
        form={formId}
        variant="contained"
        disabled={isSubmitting}
        autoFocus={isDestructive}
        onClick={isDestructive ? onConfirm : undefined}
        color={isDestructive ? 'error' : undefined}
        sx={
          isDestructive
            ? {
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(244,67,54,0.25)',
              }
            : {
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
                },
              }
        }
        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isSubmitting && savingLabel ? savingLabel : confirmLabel}
      </Button>
    </DialogActions>
  );
}

export default DialogActionButtons;