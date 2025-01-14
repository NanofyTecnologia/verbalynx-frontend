import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

export function useGetAllStudents() {
  const query = createQuery({
    queryKey: ['get-all-students'],
    fetcher: user.getAll,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
