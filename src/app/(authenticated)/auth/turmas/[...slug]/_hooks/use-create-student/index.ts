import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useCreateStudent() {
  const mutation = createMutation({
    mutationKey: ['create-student'],
    mutationFn: user.create,
  })

  return mutation()
}
