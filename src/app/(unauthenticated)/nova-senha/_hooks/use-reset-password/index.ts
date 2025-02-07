import { user } from '@/services/user'
import { createMutation } from 'react-query-kit'

export function useResetPassword() {
  const mutation = createMutation({
    mutationKey: ['reset-password'],
    mutationFn: user.resetPassword,
  })

  return mutation()
}
