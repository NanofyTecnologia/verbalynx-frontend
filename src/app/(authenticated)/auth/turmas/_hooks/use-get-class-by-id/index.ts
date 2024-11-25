import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { team } from '@/services/class'

type IProps = {
  id: string | undefined
}

export function useGetClassById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-class-by-id'],
    fetcher: team.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
