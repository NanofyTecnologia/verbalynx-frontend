import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { feedback } from '@/services/feedback'

import { IProps } from './types'

export function useGetFeedbackById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-feedback-by-id'],
    fetcher: feedback.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
