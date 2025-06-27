import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

type IProps = {
  role?: string
  teamId: string | undefined
}

export function useGetAllStudents(props: IProps) {
  const { teamId, role } = props

  const query = createQuery({
    queryKey: ['get-all-students'],
    fetcher: user.getAll,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { teamId, role } })

  return {
    ...queryResponse,
  }
}
