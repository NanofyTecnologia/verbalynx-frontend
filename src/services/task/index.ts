import axios from '@/lib/axios'

import type {
  GetTaskResponse,
  CreateTaskParams,
  GetTaskByIdParams,
  DeleteTaskParams,
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

  async getById(params: GetTaskByIdParams) {
    const { data } = await axios.get<GetTaskResponse>('/task/' + params.id)

    return data
  },

  async getFeedback(params: GetTaskByIdParams) {
    const { data } = await axios.get('/task/' + params.id + '/feedback')

    return data
  },

  async create(params: CreateTaskParams) {
    const { data } = await axios.post<GetTaskResponse>('/task', params)

    return data
  },

  async getRubric(params: GetTaskByIdParams) {
    const { data } = await axios.get(`/task/${params}/rubric`)

    return data
  },

  async delete(params: DeleteTaskParams) {
    const { data } = await axios.delete('/task/' + params.id)

    return data
  },
}
