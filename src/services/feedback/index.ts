import axios from '@/lib/axios'
import type {
  CreateFeedbackParams,
  CreateFeedbackResponse,
  GetFeedbackByIdParams,
  GetFeedbackByIdResponse,
} from './types'

export const feedback = {
  async getById(params: GetFeedbackByIdParams) {
    const { data } = await axios.get<GetFeedbackByIdResponse>(
      '/feedback/' + params.id,
    )

    return data
  },

  async create(params: CreateFeedbackParams) {
    const { data } = await axios.post<CreateFeedbackResponse>(
      '/feedback',
      params,
    )

    return data
  },
}
