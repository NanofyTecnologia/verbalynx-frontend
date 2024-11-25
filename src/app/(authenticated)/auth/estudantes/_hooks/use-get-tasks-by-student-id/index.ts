import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

import { IProps } from './types'

export function useGetTasksByStudentId(props: IProps) {
  const { id, classId } = props

  const query = createQuery({
    queryKey: ['get-tasks-by-student-id'],
    fetcher: user.getTasksById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id, classId } })

  return {
    ...queryResponse,
  }
}
