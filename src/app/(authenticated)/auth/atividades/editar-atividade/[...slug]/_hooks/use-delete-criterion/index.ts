import { createMutation } from 'react-query-kit'

import { criterion } from '@/services/criterion'

export function useDeleteCriterion() {
  const mutation = createMutation({
    mutationKey: ['delete-criterion'],
    mutationFn: criterion.delete,
  })

  return mutation()
}
