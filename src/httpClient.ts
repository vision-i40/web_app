import axios from 'axios'
import { HttpClient } from './types'

type GetHeaders = () => { [key: string]: string } | undefined

export default (baseUrl: string, getHeaders?: GetHeaders): HttpClient => {
  return {
    async post<T>(path: string, params?: {}): Promise<T> {
      return axios
        .post<T>(`${baseUrl}${path}`, params, {
          headers: getHeaders && getHeaders()
        })
        .then(response => response.data)
    },

    async get<T>(path: string): Promise<T> {
      return axios
        .get<T>(`${baseUrl}${path}`, { headers: getHeaders && getHeaders() })
        .then(response => response.data)
    }
  }
}
