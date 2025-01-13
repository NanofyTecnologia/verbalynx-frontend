import { z } from 'zod'

export const taskEditSchema = z.object({
  name: z.string().min(1, 'Insira o nome da atividade'),
  objective: z.string().min(1, 'Insira o objetivo geral da atividade'),
})

export type TaskEditData = z.infer<typeof taskEditSchema>
