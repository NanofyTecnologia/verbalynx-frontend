import axios from '@/lib/axios'

import type { GetRubricByIdResponse, GetRubricByIdParams } from './types'

export const rubric = {
  async getById(params: GetRubricByIdParams) {
    const { data } = await axios.get<GetRubricByIdResponse>(
      '/rubric/' + params.id,
    )

    return data
  },
}
