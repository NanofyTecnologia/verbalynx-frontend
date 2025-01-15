import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useDeleteStudent() {
  const mutation = createMutation({
    mutationKey: ['delete-student'],
    mutationFn: user.delete,
  })

  return mutation()
}
