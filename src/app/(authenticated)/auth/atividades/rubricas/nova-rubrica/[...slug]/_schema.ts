import { z } from 'zod'

const evaluationSchema = z.object({
  name: z.string().min(1, 'Insira o nome da avaliação'),
  description: z.string().min(1, 'Insira a descrição da avaliação'),
  level: z
    .number()
    .int()
    .min(1, 'Nível da avaliação deve ser no mínimo 1')
    .max(6, 'Nível máximo permitido é 6'),
  score: z.array(z.number()).min(1, 'A pontuação deve ter pelo menos um valor'),
})

const rubricSchema = z.object({
  name: z.string().min(1, 'Insira o nome da rubrica'),
  evaluation: evaluationSchema,
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
