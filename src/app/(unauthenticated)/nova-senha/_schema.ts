import { z } from 'zod'

export const recoverPasswordSchema = z
  .object({
    password: z.string().min(1, 'Insira sua nova senha'),
    confirmPassword: z.string().min(1, 'Confirme sua nova senha'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      })
    }
  })

export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>
