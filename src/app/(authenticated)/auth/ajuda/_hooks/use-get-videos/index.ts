import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { video } from '@/services/video'

export function useGetVideos() {
  const query = createQuery({
    queryKey: ['get-videos'],
    fetcher: video.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
