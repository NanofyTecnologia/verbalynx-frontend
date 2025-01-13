import axios from '@/lib/axios'

import { type UpdateStudentParams } from './types'

export const teacher = {
  async updateStudent(params: UpdateStudentParams) {
    const { id, ...restParams } = params
    const { data } = await axios.put('/teacher/student/' + id, restParams)

    return data
  },
}
