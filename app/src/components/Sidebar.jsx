import { useTranslation } from 'react-i18next';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Box,
    IconButton,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

export const drawerWidth = 240;
export const drawerWidthClosed = 64;

function Sidebar({ paginaAtual, setPagina, aberto, setAberto }) {
    const { t, i18n } = useTranslation();

    function toggleIdioma() {
        i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
    }

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
                    background: '#ffffff', // Fundo branco clínico
                    color: '#2f3f35',      // Texto verde escuro acinzentado
                    overflowX: 'hidden',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRight: '1px solid #e0e7e1', // Borda lateral suave
                },
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
                    <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold", textAlign: "center" }}>
                        Menu
                    </Typography>
                </Box>

                <IconButton onClick={() => setAberto(!aberto)} sx={{ color: "#78909c", mr: aberto ? 1 : 0, paddingLeft: "10px" }}>
                    {aberto ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                
            </Box>

            <Divider sx={{ borderColor: "#f0f4f0" }} />

            <List>
                {/* Médicos */}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === "medicos"}
                        onClick={() => setPagina("medicos")}
                        sx={{
                            "&.Mui-selected": { background: "#e8f5e9", color: "#2e7d32" }, // Verde claro ao selecionar
                            "&.Mui-selected:hover": { background: "#c8e6c9" },
                            "&:hover": { background: "#f1f8f1" },
                            "& .MuiListItemIcon-root": { color: paginaAtual === "medicos" ? "#2e7d32" : "#78909c" },
                            borderRadius: "8px",
                            margin: "4px 8px",
                            justifyContent: "flex-start",
                            px: .5,
                            minHeight: '48px',
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: "40px", display: 'flex', justifyContent: 'center' }}>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <Box sx={textContainerStyle}>
                            <ListItemText primary={t("menu.medicos")} sx={{ m: 0 }} />
                        </Box>
                    </ListItemButton>
                </ListItem>

                {/* Pacientes */}
                <ListItem disablePadding>
                    <ListItemButton
                        selected={paginaAtual === "pacientes"}
                        onClick={() => setPagina("pacientes")}
                        sx={{
                            "&.Mui-selected": { background: "#e8f5e9", color: "#2e7d32" },
                            "&.Mui-selected:hover": { background: "#c8e6c9" },
                            "&:hover": { background: "#f1f8f1" },
                            "& .MuiListItemIcon-root": { color: paginaAtual === "pacientes" ? "#2e7d32" : "#78909c" },
                            borderRadius: "8px",
                            margin: "4px 8px",
                            justifyContent: "flex-start",
                            px: .5,
                            minHeight: '48px',
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: "40px", display: 'flex', justifyContent: 'center' }}>
                            <PeopleIcon />
                        </ListItemIcon>
                        <Box sx={textContainerStyle}>
                            <ListItemText primary={t("menu.pacientes")} sx={{ m: 0 }} />
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
                            "&:hover": { background: "#f1f8f1" },
                            borderRadius: "8px",
                            margin: "4px 8px",
                            justifyContent: "flex-start",
                            px: .4,
                            minHeight: '48px',
                            border: "1px solid #e0e7e1",
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "#78909c",
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
                                sx={{ color: "#78909c", m: 0 }} 
                            />
                        </Box>
                    </ListItemButton>
                </ListItem>
            </Box>
        </Drawer>
    );
}

export default Sidebar;