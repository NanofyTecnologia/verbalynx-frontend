import { createMutation } from 'react-query-kit'

import { video } from '@/services/video'

export function useCreateVideo() {
  const mutation = createMutation({
    mutationKey: ['create-video'],
    mutationFn: video.create,
  })

  return mutation()
}
