import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

type IProps = {
  id: string | undefined
}

export function useGetStudentById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-student-by-id'],
    fetcher: user.getStudentById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
