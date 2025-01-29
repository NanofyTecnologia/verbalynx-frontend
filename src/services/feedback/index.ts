import axios from '@/lib/axios'
import type {
  UpdateFeedbackResponse,
  CreateFeedbackParams,
  CreateFeedbackResponse,
  CreateRevaluationParams,
  CreateRevaluationResponse,
  GetFeedbackByIdParams,
  GetFeedbackByIdResponse,
  UpdateFeedbackParams,
  GetFeedbackDetailsParams,
  GetFeedBackDetailsResponse,
} from './types'

export const feedback = {
  async getById(params: GetFeedbackByIdParams) {
    const { data } = await axios.get<GetFeedbackByIdResponse>(
      '/feedback/' + params.id,
    )

    return data
  },

  async getDetails(params: GetFeedbackDetailsParams) {
    const { data } = await axios.get<GetFeedBackDetailsResponse>(
      '/feedback/details',
      {
        params,
      },
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

  async update(params: UpdateFeedbackParams) {
    const { data } = await axios.put<UpdateFeedbackResponse>(
      '/feedback/' + params.id,
      params,
    )

    return data
  },

  async createRevaluation(params: CreateRevaluationParams) {
    const { id, ...rest } = params
    const { data } = await axios.post<CreateRevaluationResponse>(
      '/feedback/' + id,
      rest,
    )

    return data
  },
}
