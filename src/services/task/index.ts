import axios from '@/lib/axios'

import type {
  GetTaskResponse,
  CreateTaskParams,
  GetTaskByIdParams,
} from './types'

export const task = {
  async getByUserId(params: GetTaskByIdParams) {
    const { data } = await axios.get<GetTaskResponse[]>(
      '/user/task/' + params.id,
    )

    return data
  },

  async getByUser() {
    const { data } = await axios.get<GetTaskResponse[]>('/task')

    return data
  },

  // async getById(params: GetTaskByIdParams) {
  //   const { data } = await axios.get<GetTaskResponse>(
  //     'user/task/details/' + params.id,
  //   )

  //   return data
  // },

  async create(params: CreateTaskParams) {
    const { data } = await axios.post<GetTaskResponse>('/task', params)

    return data
  },
}
