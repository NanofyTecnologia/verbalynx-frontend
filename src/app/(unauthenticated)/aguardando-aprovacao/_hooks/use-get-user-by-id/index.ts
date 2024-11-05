import { createQuery } from 'react-query-kit'

import { user } from '@/services/user'

export function useGetUserById() {
  const query = createQuery({
    queryKey: ['get-user-by-id'],
    fetcher: user.getById,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
