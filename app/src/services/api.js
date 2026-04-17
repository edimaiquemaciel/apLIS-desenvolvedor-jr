import axios from 'axios';

const medicoApi = axios.create({
    baseURL: import.meta.env.VITE_API_MEDICOS,
});

const pacienteApi = axios.create({
    baseURL: import.meta.env.VITE_API_PACIENTES,
});

export const getMedicos = () => medicoApi.get('/medicos');
export const createMedico = (data) => medicoApi.post('/medicos', data);
export const updateMedico = (id, data) => medicoApi.put(`/medicos/${id}`, data);
export const deleteMedico = (id) => medicoApi.delete(`/medicos/${id}`);

export const getPacientes = () => pacienteApi.get('/pacientes');
export const createPaciente = (data) => pacienteApi.post('/pacientes', data);
export const updatePaciente = (id, data) => pacienteApi.put(`/pacientes/${id}`, data);
export const deletePaciente = (id) => pacienteApi.delete(`/pacientes/${id}`);