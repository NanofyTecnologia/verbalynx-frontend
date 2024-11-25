import axios from 'axios'

import { env } from '../env/index.mjs'

const baseURL = env.NEXT_PUBLIC_API

export default axios.create({
  baseURL,
})
