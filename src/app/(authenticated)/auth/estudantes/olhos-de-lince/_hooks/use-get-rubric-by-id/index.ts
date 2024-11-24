import { rubric } from '@/services/rubric'
import { createQuery } from 'react-query-kit'

export function useGetByRubricId() {
  const query = createQuery({
    queryKey: ['get-by-rubric-id'],
    fetcher: rubric.getById,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
