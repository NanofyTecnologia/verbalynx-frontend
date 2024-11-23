import { z } from 'zod'

export const searchSchema = z.object({
  team: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
  student: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
  task: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
})

export type SearchData = z.infer<typeof searchSchema>
