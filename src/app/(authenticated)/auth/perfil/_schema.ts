import { z } from 'zod'
import CPF from 'cpf'

export const userSchema = z.object({
  name: z.string().min(1, 'Insira seu nome'),
  email: z.string().min(1, 'Insira seu e-mail').email('E-mail inválido'),
  cpf: z
    .string()
    .min(1, 'Insira seu CPF')
    .refine((value) => CPF.isValid(value), 'CPF Inválido'),
  pronoun: z.string().min(1, 'Insira o pronome'),
})

export type UserData = z.infer<typeof userSchema>
