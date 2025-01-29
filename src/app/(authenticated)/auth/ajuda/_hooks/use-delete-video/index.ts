import { createMutation } from 'react-query-kit'

import { video } from '@/services/video'

export function useDeleteVideo() {
  const mutation = createMutation({
    mutationKey: ['delete-video'],
    mutationFn: video.delete,
  })

  return mutation()
}
