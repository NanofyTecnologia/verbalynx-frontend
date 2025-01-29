import { z } from 'zod'

const criterionSchema = z.object({
  title: z
    .string({ message: 'Insira o título do critério' })
    .min(1, 'Insira o título do critério'),
  description: z
    .string({ message: 'Insira a descrição do critério' })
    .min(1, 'Insira a descrição do critério'),
  comment: z
    .string({ message: 'Insira um comentário para o critério' })
    .min(1, 'Insira um comentário para o critério'),
  points: z
    .string({ message: 'Insira uma pontuação válida' })
    .refine((value) => value !== '0 pontos', {
      message: 'A pontuação não pode ser 0',
    }),
})

const rubricSchema = z.object({
  name: z
    .string({ message: 'Insira um nome para a rubrica' })
    .min(1, 'Insira o nome da rubrica'),
  criterion: criterionSchema,
})

export const taskSchema = z.object({
  name: z
    .string({ message: 'Insira um nome para a atividade' })
    .min(1, 'Insira o nome da atividade'),
  rubric: rubricSchema,
  objective: z
    .string({ message: 'Insira o objetivo geral da atividade' })
    .min(1, 'Insira o objetivo geral da atividade'),
  classId: z
    .string({ message: 'Vincule a atividade a uma turma' })
    .min(1, 'Vincule a atividade a uma turma'),
  openingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date({
      invalid_type_error: 'A data de abertura deve ser uma data válida',
      required_error: 'Insira a data de abertura',
    }),
  ),
  closingDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date({
      invalid_type_error: 'A data de fechamento deve ser uma data válida',
      required_error: 'Insira a data de fechamento',
    }),
  ),
})

export type TaskData = z.infer<typeof taskSchema>
