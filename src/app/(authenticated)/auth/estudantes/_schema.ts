import { z } from 'zod'

export const feedbackSchema = z.object({
  teamId: z.string(),
  userId: z.string(),
  taskId: z.string(),
  feedback: z.array(
    z.object({
      criterion: z.object({
        id: z
          .string({ message: 'Selecione o nível de qualidade' })
          .min(1, 'Selecione o nível de qualidade'),
        name: z.string().min(1),
        description: z.string().optional(),
        level: z.number(),
        comment: z.array(z.string()),
        selectedComment: z.string(),
        score: z.array(z.number()),
      }),
      criterionId: z.string(),
      level: z.number(),
      score: z.number(),
      tips: z.array(z.string()),
      comment: z.string().optional(),
    }),
  ),
})

export type FeedbackData = z.infer<typeof feedbackSchema>
