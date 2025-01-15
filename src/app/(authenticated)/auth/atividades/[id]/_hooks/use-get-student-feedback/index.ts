import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { task } from '@/services/task'

import { type IProps } from './types'

export function useGetStudentFeedback({ id }: IProps) {
  const query = createQuery({
    queryKey: ['get-student-feedback'],
    fetcher: task.getFeedback,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
