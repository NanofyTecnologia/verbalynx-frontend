import axios from '@/lib/axios'

import type {
  GetClassResponse,
  CreateClassParams,
  GetClassByIdParams,
} from './types'

export const team = {
  async getByUserId(params: GetClassByIdParams) {
    const { data } = await axios.get<GetClassResponse[]>('/class/' + params.id)

    return data
  },

  async create(params: CreateClassParams) {
    const { data } = await axios.post<GetClassResponse>('/class', params)

    return data
  },
}
