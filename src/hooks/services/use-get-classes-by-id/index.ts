import { createQuery } from 'react-query-kit'

import { team } from '@/services/class'

export function useGetClassesById() {
  const query = createQuery({
    queryKey: ['get-classes-by-id'],
    fetcher: team.getByUserId,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
