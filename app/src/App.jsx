import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';

function App() {
    const [pagina, setPagina] = useState('medicos');
    const [aberto, setAberto] = useState(false);

    return (
        <Box sx={{ 
    display: 'flex', 
    height: '100vh',
    width: '100vw', 
    overflow: 'hidden'
}}>
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
        <Box sx={{ width: '100%' }}>
            {pagina === 'medicos' && <Medicos />}
            {pagina === 'pacientes' && <Pacientes />}
        </Box>
    </Box>
</Box>
    );
}

export default App;