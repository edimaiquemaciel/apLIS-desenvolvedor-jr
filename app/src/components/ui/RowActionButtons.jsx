import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function RowActionButtons({ onEditar, onDeletar, editarLabel, deletarLabel }) {
  return (
    <>
      <Button
        onClick={onEditar}
        size="small"
        variant="contained"
        startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
        sx={{
          mr: 1,
          background: '#EF9F27',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.8rem',
          boxShadow: 'none',
          '&:hover': { background: '#d4891a', boxShadow: '0 4px 10px rgba(239,159,39,0.3)' },
        }}
      >
        {editarLabel}
      </Button>
      <Button
        onClick={onDeletar}
        size="small"
        variant="contained"
        startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
        sx={{
          background: '#E24B4A',
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.8rem',
          boxShadow: 'none',
          '&:hover': { background: '#c73d3c', boxShadow: '0 4px 10px rgba(226,75,74,0.3)' },
        }}
      >
        {deletarLabel}
      </Button>
    </>
  );
}

export default RowActionButtons;