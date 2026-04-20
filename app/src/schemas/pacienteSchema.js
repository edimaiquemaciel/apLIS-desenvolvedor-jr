import { z } from 'zod';

export const getPacienteSchema = (t) => z.object({
    nome: z.string().trim().min(1, t('pacientes.nomeObrigatorio')),
    dataNascimento: z.string().min(1, t('pacientes.dataObrigatoria')),
    carteirinha: z.string().trim().min(1, t('pacientes.carteirinhaObrigatoria')),
    cpf: z.string()
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 11, { message: t('pacientes.cpfInvalido') }),
});