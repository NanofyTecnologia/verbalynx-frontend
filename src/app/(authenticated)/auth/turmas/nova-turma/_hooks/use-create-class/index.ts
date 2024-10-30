import { createMutation } from 'react-query-kit'

import { team } from '@/services/class'

export function useCreateClass() {
  const mutation = createMutation({
    mutationKey: ['create-class'],
    mutationFn: team.create,
  })

  return mutation()
}
