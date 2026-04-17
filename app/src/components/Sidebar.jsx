function Sidebar({ paginaAtual, setPagina }) {
    return (
        <aside style={{
            width: '200px',
            minHeight: '100vh',
            background: '#1e1e2e',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <h2 style={{ color: '#fff', marginBottom: '24px', fontSize: '18px' }}>Menu</h2>

            <button
                onClick={() => setPagina('medicos')}
                style={{
                    background: paginaAtual === 'medicos' ? '#534AB7' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                }}
            >
                Médicos
            </button>

            <button
                onClick={() => setPagina('pacientes')}
                style={{
                    background: paginaAtual === 'pacientes' ? '#534AB7' : 'transparent',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                }}
            >
                Pacientes
            </button>
        </aside>
    );
}

export default Sidebar;