import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

function ConfirmDialog({ aberto, mensagem, onConfirm, onCancel }) {
    return (
        <Dialog open={aberto} onClose={onCancel}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogContent>
                <DialogContentText>{mensagem}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} variant="outlined">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;