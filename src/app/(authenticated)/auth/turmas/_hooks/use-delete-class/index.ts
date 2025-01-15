import { createMutation } from 'react-query-kit'

import { team } from '@/services/class'

export function useDeleteClass() {
  const mutation = createMutation({
    mutationKey: ['delete-class'],
    mutationFn: team.delete,
  })

  return mutation()
}
