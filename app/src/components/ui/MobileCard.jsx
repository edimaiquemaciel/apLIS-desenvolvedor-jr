import { Box, Typography, Divider } from '@mui/material';

function MobileCard({ fields, actions }) {
  return (
    <Box sx={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e0e7e1',
      boxShadow: '0 2px 8px rgba(46,125,50,0.07)',
      p: 2,
      mb: 1.5,
    }}>
      {fields.map((field, i) => (
        <Box key={i}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.6 }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#78909c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {field.label}
            </Typography>
            <Box sx={{ fontSize: '0.9rem', color: '#2f3f35', fontWeight: 500, textAlign: 'right' }}>
              {field.value}
            </Box>
          </Box>
          {i < fields.length - 1 && <Divider sx={{ borderColor: '#f0f4f0' }} />}
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, justifyContent: 'flex-end' }}>
        {actions}
      </Box>
    </Box>
  );
}

export default MobileCard;