import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

export function useGetTasks() {
  const query = createQuery({
    queryKey: ['get-tasks'],
    fetcher: user.getTasks,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
