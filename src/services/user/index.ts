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
  GetStudentByIdParams,
  GetStudentByIdResponse,
  SendStudentTask,
} from './types'

export const user = {
  async getAll() {
    const { data } =
      await axios.get<GetUserByIdResponse[]>('/user/all/students')

    return data
  },

  async getById() {
    const { data } = await axios.get<GetUserByIdResponse>('/user')

    return data
  },

  async getStudentById(params: GetStudentByIdParams) {
    const { data } = await axios.get<GetStudentByIdResponse>(
      '/user/students/' + params.id,
    )

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

  async sendTask(params: SendStudentTask) {
    const { id, ...restParams } = params
    const { data } = await axios.post(`/user/task/` + params.id, restParams)

    return data
  },
}
