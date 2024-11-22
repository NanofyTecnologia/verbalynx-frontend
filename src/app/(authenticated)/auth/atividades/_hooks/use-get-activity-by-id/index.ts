import { createQuery } from 'react-query-kit'

type IProps = {
  id: string | undefined
}

export function useGetActivityById(props: IProps) {
  const { id } = props

  const query = createQuery({
    //
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
