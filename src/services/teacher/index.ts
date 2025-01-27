import axios from '@/lib/axios'

import type {
  CreateStudentsInTeam,
  UpdateStudentParams,
  UpdateTaskParams,
} from './types'

export const teacher = {
  async updateStudent(params: UpdateStudentParams) {
    const { id, ...restParams } = params
    const { data } = await axios.put('/teacher/student/' + id, restParams)

    return data
  },

  async updateTask(params: UpdateTaskParams) {
    const { id, ...restParams } = params
    const { data } = await axios.put('/teacher/task/' + id, restParams)

    return data
  },

  async createStudentsInTeam(params: CreateStudentsInTeam) {
    const { id, ...restParams } = params
    const { data } = await axios.post('/teacher/team/' + id, restParams)

    return data
  },
}
