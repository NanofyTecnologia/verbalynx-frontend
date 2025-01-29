import { createMutation } from 'react-query-kit'

import { teacher } from '@/services/teacher'

export function useCreateStudentsInTeam() {
  const mutation = createMutation({
    mutationKey: ['selected-students'],
    mutationFn: teacher.createStudentsInTeam,
  })

  return mutation()
}
