import axios from '@/lib/axios'

import type {
  CreateUserParams,
  CreateUserResponse,
  GetTaskByStudentIdResponse,
  GetTasksByStudentId,
  GetUserByIdResponse,
  UpdateUserParams,
} from './types'

export const user = {
  async getById() {
    const { data } = await axios.get<GetUserByIdResponse>('/user')

    return data
  },

  async getTasksById(params: GetTasksByStudentId) {
    const { data } = await axios.get<GetTaskByStudentIdResponse>(
      '/user/task/' + params.id,
      {
        params: {
          classId: params.classId,
        },
      },
    )

    return data
  },

  async getTasks() {
    const { data } = await axios.get('/user/task')

    return data
  },

  async create(params: CreateUserParams) {
    const { data } = await axios.post<CreateUserResponse>('/user', params)

    return data
  },

  async update(params: UpdateUserParams) {
    const { data } = await axios.put('/user', params)

    return data
  },
}
