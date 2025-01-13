import { createMutation } from 'react-query-kit'

// import { task } from '@/services/task'

export function useEditTask() {
  const mutation = createMutation({
    mutationKey: ['edit-task'],
    // mutationFn: task.edit,
  })

  return mutation()
}
