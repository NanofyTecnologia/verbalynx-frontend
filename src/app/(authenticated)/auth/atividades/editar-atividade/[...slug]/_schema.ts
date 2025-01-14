import { z } from 'zod'

const rubricSchema = z.object({
  name: z.string().min(1, 'Insira o nome da rubrica'),
})

export const taskEditSchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  objective: z.string().min(1, 'Insira o objetivo geral da atividade'),
  rubric: rubricSchema,
  openingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date().or(z.string()),
  ),
  closingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date().or(z.string()),
  ),
})

export type TaskEditData = z.infer<typeof taskEditSchema>
