import { z } from 'zod';

export const getMedicoSchema = (t) => z.object({
    nome: z.string().trim().min(1, t('medicos.nomeObrigatorio')),
    CRM: z.string()
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 6, { message: t('medicos.crmTamanho') }),
    UFCRM: z.string().min(1, t('medicos.ufObrigatorio')),
});