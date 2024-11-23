import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { task } from '@/services/task'

export function useGetTasks() {
  const query = createQuery({
    queryKey: ['get-tasks'],
    fetcher: task.getByTeacher,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
