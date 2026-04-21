import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';

function BaseFormDialog({ aberto, onCancel, title, formId, onSubmit, children, actionButtons }) {
  return (
    <Dialog open={aberto} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700, color: '#2f3f35' }}>{title}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id={formId}
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 1 }}
        >
          {children}
        </Box>
      </DialogContent>
      {actionButtons}
    </Dialog>
  );
}

export default BaseFormDialog;