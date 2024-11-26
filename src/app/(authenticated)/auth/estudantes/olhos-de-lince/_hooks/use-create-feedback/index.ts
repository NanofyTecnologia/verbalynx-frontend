import { createMutation } from 'react-query-kit'

import { feedback } from '@/services/feedback'

export function useCreateFeedback() {
  const mutation = createMutation({
    mutationKey: ['create-feedback'],
    mutationFn: feedback.create,
  })

  return mutation()
}
