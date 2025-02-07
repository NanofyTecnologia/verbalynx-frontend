import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Insira um e-mail válido' })
    .min(1, { message: 'Insira seu e-mail' }),
  password: z.string().min(1, 'Insira sua senha'),
})

export type SignInData = z.infer<typeof signInSchema>
