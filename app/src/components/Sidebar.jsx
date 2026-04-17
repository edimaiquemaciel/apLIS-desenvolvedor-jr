import { useTranslation } from 'react-i18next';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Divider,
    Box,
    IconButton,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const drawerWidthClosed = 64;

function Sidebar({ paginaAtual, setPagina, aberto, setAberto }) {
    const { t, i18n } = useTranslation();

    function toggleIdioma() {
        i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: aberto ? drawerWidth : drawerWidthClosed,
                flexShrink: 0,
                transition: 'width 0.3s',
                '& .MuiDrawer-paper': {
                    width: aberto ? drawerWidth : drawerWidthClosed,
                    boxSizing: 'border-box',
                    background: '#1e1e2e',
                    color: '#fff',
                    overflowX: 'hidden',
                    transition: 'width 0.3s',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', justifyContent: aberto ? 'space-between' : 'center' }}>
                {aberto && (
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        Menu
                    </Typography>
                )}
                <IconButton onClick={() => setAberto(!aberto)} sx={{ color: '#fff' }}>
                    {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </Box>

            <Divider sx={{ borderColor: '#444' }} />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === 'medicos'}
                        onClick={() => setPagina('medicos')}
                        sx={{
                            '&.Mui-selected': { background: '#534AB7' },
                            '&.Mui-selected:hover': { background: '#6259c7' },
                            '&:hover': { background: '#2a2a3e' },
                            borderRadius: '8px',
                            margin: '4px 8px',
                            justifyContent: aberto ? 'initial' : 'center',
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff', minWidth: aberto ? '36px' : 'auto' }}>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        {aberto && <ListItemText primary={t('menu.medicos')} sx={{ color: '#fff' }} />}
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === 'pacientes'}
                        onClick={() => setPagina('pacientes')}
                        sx={{
                            '&.Mui-selected': { background: '#534AB7' },
                            '&.Mui-selected:hover': { background: '#6259c7' },
                            '&:hover': { background: '#2a2a3e' },
                            borderRadius: '8px',
                            margin: '4px 8px',
                            justifyContent: aberto ? 'initial' : 'center',
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff', minWidth: aberto ? '36px' : 'auto' }}>
                            <PeopleIcon />
                        </ListItemIcon>
                        {aberto && <ListItemText primary={t('menu.pacientes')} sx={{ color: '#fff' }} />}
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ marginTop: 'auto', padding: '16px', display: 'flex', justifyContent: 'center' }}>
                {aberto ? (
                    <Button
                        onClick={toggleIdioma}
                        startIcon={<LanguageIcon />}
                        fullWidth
                        sx={{
                            color: '#aaa',
                            border: '1px solid #444',
                            borderRadius: '8px',
                            '&:hover': { background: '#2a2a3e' },
                        }}
                    >
                        {i18n.language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
                    </Button>
                ) : (
                    <IconButton onClick={toggleIdioma} sx={{ color: '#aaa' }}>
                        <LanguageIcon />
                    </IconButton>
                )}
            </Box>
        </Drawer>
    );
}

export default Sidebar;