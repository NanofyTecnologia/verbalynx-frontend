import { createQuery } from 'react-query-kit'

import { rubric } from '@/services/rubric'

import { IProps } from './types'

export function useGetByRubricId(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-by-rubric-id'],
    fetcher: rubric.getById,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
