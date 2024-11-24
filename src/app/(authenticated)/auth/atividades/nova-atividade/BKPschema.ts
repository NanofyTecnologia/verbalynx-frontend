import { z } from 'zod'

export const taskSchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  rubric: z.string().min(1, 'Insira o nome da rubrica'),
  level: z.string().min(1, 'Insira o nível da rubrica'),
  objective: z.string().min(1, 'Insira o objetivo geral da atividade'),
  classId: z.string().min(1, 'Vincule a atividade a uma turma'),
  openingDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date(),
  ),
  closingDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date(),
  ),
})

export type TaskData = z.infer<typeof taskSchema>
