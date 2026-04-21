export const sxCard = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
  border: '1px solid #e0e7e1',
  p: 3,
  mb: 4,
};

export const sxPrimaryBtn = {
  background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  py: 1.2,
  boxShadow: '0 4px 12px rgba(46,125,50,0.25)',
  '&:hover': {
    background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
    boxShadow: '0 6px 16px rgba(46,125,50,0.35)',
  },
};

export const sxField = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '&.Mui-focused fieldset': { borderColor: '#2e7d32' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2e7d32' },
};