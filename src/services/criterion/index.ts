import axios from '@/lib/axios'

import type { DeleteCriterionParams } from './types'

export const criterion = {
  async delete(params: DeleteCriterionParams) {
    const { data } = await axios.delete('/criterion/' + params.id)

    return data
  },
}
