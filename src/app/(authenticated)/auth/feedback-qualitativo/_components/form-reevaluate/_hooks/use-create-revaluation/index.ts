import { createMutation } from 'react-query-kit'

import { feedback } from '@/services/feedback'

export function useCreateRevaluation() {
  const mutation = createMutation({
    mutationKey: ['use-create-revaluation'],
    mutationFn: feedback.createRevaluation,
  })

  return mutation()
}
