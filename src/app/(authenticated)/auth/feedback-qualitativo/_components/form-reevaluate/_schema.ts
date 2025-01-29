import { z } from 'zod'

export const criterionSchema = z.object({
  level: z.number(),
  score: z.number(),
  comment: z.string(),
  criterionId: z.string(),
  tips: z.array(z.string()).optional(),
})

export type CriterionData = z.infer<typeof criterionSchema>
