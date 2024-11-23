import axios from '@/lib/axios'

import type {
  GetClassResponse,
  CreateClassParams,
  GetClassByIdParams,
  GetStundentsByClassIdResponse,
} from './types'

export const team = {
  async getByUserId() {
    const { data } = await axios.get<GetClassResponse[]>('/class')

    return data
  },

  async getById(params: GetClassByIdParams) {
    const { data } = await axios.get<GetClassResponse>(
      '/class/details/' + params.id,
    )

    return data
  },

  async create(params: CreateClassParams) {
    const { data } = await axios.post<GetClassResponse>('/class', params)

    return data
  },

  async getStudentsById(params: GetClassByIdParams) {
    const { data } = await axios.get<GetStundentsByClassIdResponse>(
      '/class/students/' + params.id,
    )

    return data
  },
}
