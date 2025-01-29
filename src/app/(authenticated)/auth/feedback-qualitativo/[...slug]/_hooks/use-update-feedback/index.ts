import { createMutation } from 'react-query-kit'

import { feedback } from '@/services/feedback'

export function useUpdateFeedback() {
  const mutation = createMutation({
    mutationKey: ['update-feedback'],
    mutationFn: feedback.update,
  })

  return mutation()
}
