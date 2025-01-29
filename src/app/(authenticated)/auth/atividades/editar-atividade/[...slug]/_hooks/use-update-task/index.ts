import { createMutation } from 'react-query-kit'

import { teacher } from '@/services/teacher'

export function useUpdateTask() {
  const mutation = createMutation({
    mutationKey: ['update-task'],
    mutationFn: teacher.updateTask,
  })

  return mutation()
}
