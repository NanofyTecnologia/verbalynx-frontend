import { z } from 'zod'

export const activitySchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  rubric: z.string().min(1, 'Insira o nome da rubrica'),
  rubricLevel: z.string().min(1, 'Insira o nível da rubrica'),
  generalObjective: z.string().min(1, 'Insira o objetivo geral da atividade'),
})

export type ActivityData = z.infer<typeof activitySchema>
