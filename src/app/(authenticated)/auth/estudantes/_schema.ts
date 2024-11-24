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
  evaluation: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    level: z.number(),
    score: z.array(z.number()),
  }),
  level: z.number(),
  comment: z.string(),
})

export type SearchData = z.infer<typeof searchSchema>
