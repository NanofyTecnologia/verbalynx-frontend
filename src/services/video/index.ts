import axios from '@/lib/axios'

import type {
  GetVideoResponse,
  CreateVideoParams,
  CreateVideoResponse,
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
}
