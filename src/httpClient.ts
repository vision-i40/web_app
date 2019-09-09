import axios from 'axios'
import { HttpClient } from './types'

export default (): HttpClient => ({
  async post<T>(
    path: string,
    params: any,
    headers?: { [key: string]: string }
  ): Promise<T> {
    return axios
      .post<T>(path, params, { headers })
      .then(response => response.data)
  }
})
