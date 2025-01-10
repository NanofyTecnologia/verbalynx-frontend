import axios from '@/lib/axios'

import type {
  CreateManyUsersParams,
  CreateUserParams,
  CreateUserResponse,
  GetTaskByStudentIdResponse,
  GetTasksByStudentId,
  GetUserByIdResponse,
  UpdateUserParams,
  DeleteUserParams,
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

  async createStudents(params: CreateManyUsersParams) {
    const { data } = await axios.post(
      '/user/students/' + params.id,
      params.students,
    )

    return data
  },

  async delete(params: DeleteUserParams) {
    const { data } = await axios.delete(`/user/${params.id}`)

    return data
  },
}
