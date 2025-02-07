import { z } from 'zod'

export const recoverPasswordSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
})

export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>
