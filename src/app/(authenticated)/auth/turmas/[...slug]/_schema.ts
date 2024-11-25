import { z } from 'zod'

export const studentSchema = z.object({
  name: z.string().min(1, 'Insira o nome do estudante'),
  email: z.string().min(1, 'Insira o e-mail do estudante').email(),
  registrationCode: z.string().min(1, 'Insira o código de matrícula'),
  observation: z.string(),
})

export type StudentData = z.infer<typeof studentSchema>
