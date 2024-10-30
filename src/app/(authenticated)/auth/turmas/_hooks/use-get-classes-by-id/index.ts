import { createQuery } from 'react-query-kit'

import { team } from '@/services/class'

import { IProps } from './types'

export function useGetClassesById({ id }: IProps) {
  const query = createQuery({
    queryKey: ['get-classes-by-id'],
    fetcher: team.getByUserId,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
