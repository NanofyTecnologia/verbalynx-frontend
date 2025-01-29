import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useCreateStudents() {
  const mutation = createMutation({
    mutationKey: ['create-students'],
    mutationFn: user.createStudents,
  })

  return mutation()
}
