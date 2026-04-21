import { TextField } from '@mui/material';
import { sxField } from '../../constants/muiStyles';

function FormTextField({ label, error, helperText, sx, ...props }) {
  return (
    <TextField
      label={label}
      error={!!error}
      helperText={helperText}
      fullWidth
      size="small"
      InputLabelProps={{ shrink: true }}
      sx={{ ...sxField, ...sx }}
      {...props}
    />
  );
}

export default FormTextField;