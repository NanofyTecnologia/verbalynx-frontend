import { z } from 'zod'

export const feedbackSchema = z.object({
  teamId: z.string(),
  userId: z.string(),
  taskId: z.string(),
  feedback: z.array(
    z.object({
      criterion: z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        level: z.number(),
        comment: z.array(z.string()),
        selectedComment: z.string(),
        score: z.array(z.number()),
      }),
      criterionId: z.string(),
      level: z.number(),
      score: z.number(),
      tips: z.array(z.string()),
      comment: z.string().min(1, 'Insira o comentário de feedback'),
    }),
  ),
})

export type FeedbackData = z.infer<typeof feedbackSchema>
