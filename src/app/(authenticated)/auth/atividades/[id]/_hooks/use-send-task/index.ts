import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useSendTask() {
  const mutation = createMutation({
    mutationKey: ['send-task'],
    mutationFn: user.sendTask,
  })

  return mutation()
}
