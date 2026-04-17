import axios from 'axios';

const medicoApi = axios.create({
    baseURL: import.meta.env.VITE_API_MEDICOS,
});

const pacienteApi = axios.create({
    baseURL: import.meta.env.VITE_API_PACIENTES,
});

export const getMedicos = () => medicoApi.get('/medicos');
export const createMedico = (data) => medicoApi.post('/medicos', data);

export const getPacientes = () => pacienteApi.get('/pacientes');
export const createPaciente = (data) => pacienteApi.post('/pacientes', data);