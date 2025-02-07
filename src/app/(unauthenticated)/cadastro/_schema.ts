import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Insira seu nome completo'),
    email: z.string().min(1, 'Insira seu e-mail').email(),
    graduation: z.string().min(1, 'Insira o nível de graduação'),
    password: z.string().min(1, 'Insira uma senha'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
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

export type RegisterData = z.infer<typeof registerSchema>
