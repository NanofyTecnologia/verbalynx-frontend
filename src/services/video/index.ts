import axios from '@/lib/axios'

import type {
  GetVideoResponse,
  CreateVideoParams,
  CreateVideoResponse,
  DeleteVideoParams,
} from './types'

export const video = {
  async get() {
    const { data } = await axios.get<GetVideoResponse>('/video')

    return data
  },

  async create(params: CreateVideoParams) {
    const { data } = await axios.post<CreateVideoResponse>('/video', params)

    return data
  },

  async delete(params: DeleteVideoParams) {
    const { data } = await axios.delete('/video/' + params.id)

    return data
  },
}
