import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';

function App() {
    const [pagina, setPagina] = useState('medicos');
    const [aberto, setAberto] = useState(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar
                paginaAtual={pagina}
                setPagina={setPagina}
                aberto={aberto}
                setAberto={setAberto}
            />
            <Box sx={{ flex: 1, transition: 'margin 0.3s' }}>
                {pagina === 'medicos' && <Medicos />}
                {pagina === 'pacientes' && <Pacientes />}
            </Box>
        </Box>
    );
}

export default App;