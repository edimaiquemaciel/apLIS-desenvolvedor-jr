import { TextField } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import { sxField } from '../../constants/muiStyles';

function FormPatternField({ format, mask, onChange, value, inputRef, label, error, helperText }) {
  return (
    <PatternFormat
      format={format}
      mask={mask}
      value={value}
      getInputRef={inputRef}
      onValueChange={(values) => onChange(values.value)}
      customInput={TextField}
      label={label}
      error={!!error}
      helperText={helperText}
      fullWidth
      size="small"
      InputLabelProps={{ shrink: true }}
      sx={sxField}
    />
  );
}

export default FormPatternField;