import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Medicos from './pages/Medicos';
import Pacientes from './pages/Pacientes';

function App() {
    const [pagina, setPagina] = useState('medicos');

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar paginaAtual={pagina} setPagina={setPagina} />
            {pagina === 'medicos' && <Medicos />}
            {pagina === 'pacientes' && <Pacientes />}
        </div>
    );
}

export default App;