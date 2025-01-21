import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

type IProps = {
  teamId: string | undefined
}

export function useGetAllStudents(props: IProps) {
  const { teamId } = props

  const query = createQuery({
    queryKey: ['get-all-students'],
    fetcher: user.getAll,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { teamId } })

  return {
    ...queryResponse,
  }
}
