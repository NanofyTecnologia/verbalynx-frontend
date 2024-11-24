import { z } from 'zod'

const rubricSchema = z.object({
  name: z.string().min(1, 'Insira o nome da rubrica'),
})

export const taskSchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  rubric: rubricSchema,
  objective: z.string().min(1, 'Insira o objetivo geral da atividade'),
  classId: z.string().min(1, 'Vincule a atividade a uma turma'),
  openingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date(),
  ),
  closingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date(),
  ),
})

export type TaskData = z.infer<typeof taskSchema>
