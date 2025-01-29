import { z } from 'zod'

export const sendTaskSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().min(1),
})

export type SendTaskData = z.infer<typeof sendTaskSchema>
