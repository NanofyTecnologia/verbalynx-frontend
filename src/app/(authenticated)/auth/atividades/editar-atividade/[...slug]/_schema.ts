import { z } from 'zod'

const rubricSchema = z.object({
  name: z.string().min(1, 'Insira o nome da rubrica'),
})

export const taskEditSchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  objective: z.string().min(1, 'Insira o objetivo geral da atividade'),
  rubric: rubricSchema,
  criterion: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      description: z.string(),
      level: z.number(),
      comment: z.array(z.string()),
      selectedComment: z.string(),
      score: z.array(z.number()),
    }),
  ),
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
