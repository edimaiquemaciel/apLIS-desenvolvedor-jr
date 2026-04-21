import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';

function App() {
    const [pagina, setPagina] = useState('medicos');
    const [aberto, setAberto] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Sidebar
                paginaAtual={pagina}
                setPagina={setPagina}
                aberto={aberto}
                setAberto={setAberto}
            />

            <Box component="main" sx={{
                flexGrow: 1,
                height: '100vh',
                overflowY: 'auto',
                background: '#f7f6fb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {isMobile && (
                    <AppBar position="static" elevation={0} sx={{
                        background: '#fff',
                        borderBottom: '1px solid #e0e7e1',
                        width: '100%',
                    }}>
                        <Toolbar>
                            <IconButton onClick={() => setAberto(true)} sx={{ color: '#2e7d32', mr: 1 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 700 }}>
                                Menu
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}

                <Box sx={{ width: '100%' }}>
                    {pagina === 'medicos' && <Medicos />}
                    {pagina === 'pacientes' && <Pacientes />}
                </Box>
            </Box>
        </Box>
    );
}

export default App;