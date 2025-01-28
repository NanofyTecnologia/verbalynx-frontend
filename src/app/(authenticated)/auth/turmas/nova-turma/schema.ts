import { z } from 'zod'

export const classSchema = z.object({
  name: z.string().min(1, 'Insira o nome da turma'),
  period: z
    .string({ message: 'Insira o período da turma' })
    .min(1, 'Insira o período da turma'),
  educationLevel: z
    .string({ message: 'Insira o período da turma' })
    .min(1, 'Insira o ensino da turma'),
})

export type ClassData = z.infer<typeof classSchema>
