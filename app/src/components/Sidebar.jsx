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

// ← Exportamos as constantes (obrigatório para o App usar)
export const drawerWidth = 240;
export const drawerWidthClosed = 64;

function Sidebar({ paginaAtual, setPagina, aberto, setAberto }) {
    const { t, i18n } = useTranslation();

    function toggleIdioma() {
        i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
    }

    // Estilo comum para o texto que desliza suavemente
    const textContainerStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: 'opacity 0.4s ease, width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        width: aberto ? '100%' : '0px',
        opacity: aberto ? 1 : 0,
        pointerEvents: aberto ? 'auto' : 'none',
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: aberto ? drawerWidth : drawerWidthClosed,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                '& .MuiDrawer-paper': {
                    width: aberto ? drawerWidth : drawerWidthClosed,
                    boxSizing: 'border-box',
                    background: '#1e1e2e',
                    color: '#fff',
                    overflowX: 'hidden',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRight: 'none',
                },
                // ← Adicionado de volta (melhora a estabilidade da animação)
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    justifyContent: "flex-start",
                    minHeight: '64px',
                }}
            >
                <Box sx={{...textContainerStyle}}>
                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold", textAlign: "center"  }}>
                        Menu
                    </Typography>
                </Box>

                <IconButton onClick={() => setAberto(!aberto)} sx={{ color: "#fff", mr: aberto ? 1 : 0, paddingLeft: "10px" }}>
                    {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                
            </Box>

            <Divider sx={{ borderColor: "#444" }} />

            <List>
                {/* Médicos */}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === "medicos"}
                        onClick={() => setPagina("medicos")}
                        sx={{
                            "&.Mui-selected": { background: "#534AB7" },
                            "&.Mui-selected:hover": { background: "#6259c7" },
                            "&:hover": { background: "#2a2a3e" },
                            borderRadius: "8px",
                            margin: "4px 8px",
                            justifyContent: "flex-start",
                            px: .5,
                            minHeight: '48px',
                        }}
                    >
                        <ListItemIcon sx={{ color: "#fff", minWidth: "40px", display: 'flex', justifyContent: 'center' }}>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <Box sx={textContainerStyle}>
                            <ListItemText primary={t("menu.medicos")} sx={{ color: "#fff", m: 0 }} />
                        </Box>
                    </ListItemButton>
                </ListItem>

                {/* Pacientes */}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === "pacientes"}
                        onClick={() => setPagina("pacientes")}
                        sx={{
                            "&.Mui-selected": { background: "#534AB7" },
                            "&.Mui-selected:hover": { background: "#6259c7" },
                            "&:hover": { background: "#2a2a3e" },
                            borderRadius: "8px",
                            margin: "4px 8px",
                            justifyContent: "flex-start",
                            px: .5,
                            minHeight: '48px',
                        }}
                    >
                        <ListItemIcon sx={{ color: "#fff", minWidth: "40px", display: 'flex', justifyContent: 'center' }}>
                            <PeopleIcon />
                        </ListItemIcon>
                        <Box sx={textContainerStyle}>
                            <ListItemText primary={t("menu.pacientes")} sx={{ color: "#fff", m: 0 }} />
                        </Box>
                    </ListItemButton>
                </ListItem>
            </List>

            {/* Rodapé - Idioma */}
            <Box sx={{ marginTop: "auto", padding: "0 0 16px" }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={toggleIdioma}
                        sx={{
                            "&:hover": { background: "#2a2a3e" },
                            borderRadius: "8px",
                            margin: "4px 8px",           // mesma margem
                            justifyContent: "flex-start",
                            px: .4,                      // mesmo padding
                            minHeight: '48px',
                            border: "1px solid #444",
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "#fff",
                                minWidth: "40px",
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <LanguageIcon />
                        </ListItemIcon>

                        <Box sx={textContainerStyle}>
                            <ListItemText
                                primary={i18n.language === "pt" ? "Português" : "English"}
                                sx={{ color: "#aaa", m: 0 }}   // cor cinza para diferenciar
                            />
                        </Box>
                    </ListItemButton>
                </ListItem>
            </Box>
        </Drawer>
    );
}

export default Sidebar;