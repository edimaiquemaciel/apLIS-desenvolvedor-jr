import { Box, Typography } from '@mui/material';

function PageHeader({ icon, titulo, count, registrado, registrados }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
        borderRadius: '14px',
        p: 1.2,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2f3f35', lineHeight: 1.2 }}>
          {titulo}
        </Typography>
        <Typography variant="body2" sx={{ color: '#78909c', mt: 0.3 }}>
          {count} {count === 1 ? registrado : registrados}
        </Typography>
      </Box>
    </Box>
  );
}

export default PageHeader;