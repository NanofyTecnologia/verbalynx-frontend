import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useGetAllStudents() {
  const mutation = createMutation({
    mutationKey: ['get-all-students'],
    mutationFn: user.getAll,
  })

  return mutation()
}
