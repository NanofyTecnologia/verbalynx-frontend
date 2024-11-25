import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Insira seu nome completo'),
  email: z.string().min(1, 'Insira seu e-mail').email(),
  graduation: z.string().min(1, 'Insira o nível de graduação'),
})

export type RegisterData = z.infer<typeof registerSchema>
