import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { feedback } from '@/services/feedback'

import { IProps } from './types'

export function useGetFeedbackDetails(props: IProps) {
  const { userId, teamId, taskId } = props

  const query = createQuery({
    queryKey: ['get-feedbacl-details'],
    fetcher: feedback.getDetails,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { userId, teamId, taskId } })

  return {
    ...queryResponse,
  }
}
