import { z } from 'zod'
import CPF from 'cpf'

export const studentSchema = z.object({
  name: z.string().min(1, 'Insira seu nome'),
  email: z.string().min(1, 'Insira seu e-mail').email('E-mail inválido'),
  cpf: z
    .string()
    .min(1, 'Insira seu CPF')
    .refine((value) => CPF.isValid(value), 'CPF Inválido'),
  graduation: z.string().min(1, 'Insira o ensino do estudante'),
})

export type StudentData = z.infer<typeof studentSchema>
