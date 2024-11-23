import { createQuery } from 'react-query-kit'

import { team } from '@/services/class'

import { IProps } from './types'

export function useGetStudentsByClassId(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-students-by-class-id'],
    fetcher: team.getStudentsById,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
