import { Snackbar, Alert } from '@mui/material';

function Toast({ mensagem, tipo, aberto, onClose }) {
    return (
        <Snackbar
            open={aberto}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={tipo} variant="filled" sx={{ width: '100%' }}>
                {mensagem}
            </Alert>
        </Snackbar>
    );
}

export default Toast;