import { z } from 'zod'

export const studentSchema = z
  .object({
    name: z.string().min(1, 'Insira o nome do estudante'),
    email: z.string().min(1, 'Insira o e-mail do estudante').email(),
    cpf: z.string().optional(),
    registrationCode: z.string().optional(),
    observation: z.string().optional(),
  })
  .refine((data) => data.cpf || data.registrationCode, {
    message: 'Insira pelo menos um dos campos: CPF ou Código de Matrícula',
    path: ['cpf'],
  })

export const filterSchema = z.object({
  search: z.string(),
})

export type StudentData = z.infer<typeof studentSchema>
export type FilterData = z.infer<typeof filterSchema>
