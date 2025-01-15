import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { task } from '@/services/task'

type IProps = {
  id: string | undefined
}

export function useGetTaskById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-tasks-by-id'],
    fetcher: task.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
