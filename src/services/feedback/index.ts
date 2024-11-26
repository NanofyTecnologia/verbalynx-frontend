import axios from '@/lib/axios'
import { CreateFeedbackParams, CreateFeedbackResponse } from './types'

export const feedback = {
  async create(params: CreateFeedbackParams) {
    const { data } = await axios.post<CreateFeedbackResponse>(
      '/feedback',
      params,
    )

    return data
  },
}
