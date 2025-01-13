import { createMutation } from 'react-query-kit'

// import { teacher } from '@/services/teacher'

export function useUpdateStudent() {
  const mutation = createMutation({
    mutationKey: ['update-student'],
    // mutationFn: teacher.updateStudent,
  })

  return mutation()
}
