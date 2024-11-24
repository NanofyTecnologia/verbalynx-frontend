import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { rubric } from '@/services/rubric'

type IProps = {
  id: string | undefined
}

export function useGetRubric(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-rubrics-by-id'],
    fetcher: rubric.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
