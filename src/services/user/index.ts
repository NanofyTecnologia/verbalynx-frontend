import axios from '@/lib/axios'

import type {
  CreateUserParams,
  CreateUserResponse,
  GetUserByIdResponse,
} from './types'

export const user = {
  async getById() {
    const { data } = await axios.get<GetUserByIdResponse>('/user')

    return data
  },

  async create(params: CreateUserParams) {
    const { data } = await axios.post<CreateUserResponse>('/user', params)

    return data
  },
}
