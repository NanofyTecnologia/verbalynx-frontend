import axios from '@/lib/axios'

import type { GetRubricByIdParams } from './types'

export const rubric = {
  async getById(params: GetRubricByIdParams) {
    const { data } = await axios.get('/rubric/' + params.id)

    return data
  },
}
