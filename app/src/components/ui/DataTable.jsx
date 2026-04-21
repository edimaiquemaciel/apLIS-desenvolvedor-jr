import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
} from '@mui/material';

const sxHeaderCell = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.85rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

function DataTable({ columns, children }) {
  return (
    <TableContainer component={Paper} sx={{
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
      border: '1px solid #e0e7e1',
      overflow: 'hidden',
    }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)' }}>
            {columns.map((col, i) => (
              <TableCell key={i} align={col.align || 'left'} sx={sxHeaderCell}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;