import { z } from 'zod'

export const videoSchema = z.object({
  title: z.string().min(1, 'Insira o título do vídeo'),
  url: z.string().min(1, 'Insira URL do vídeo').url('URL inválida'),
})

export type VideoData = z.infer<typeof videoSchema>
