import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useSendEmail() {
  const mutation = createMutation({
    mutationKey: ['send-email'],
    mutationFn: user.sendEmailRecoverPassword,
  })

  return mutation()
}
