import { createMutation } from 'react-query-kit'
import { user } from '@/services/user'

type IProps = {
  id: string
}

export const useDeleteStudent = createMutation({
  mutationKey: ['delete-student'],
  mutationFn: async ({ id }: IProps) => {
    const response = await user.delete(id)
    return response
  },
})
