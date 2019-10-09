import axios from 'axios'
import { HttpClient, HttpErrorHandler } from '../types'

type HttpClientOptions = {
  baseUrl: string
  getHeaders?: () => { [key: string]: string } | undefined
  onError?: HttpErrorHandler
}

export default ({
  baseUrl,
  getHeaders,
  onError
}: HttpClientOptions): HttpClient => {
  const post = async <T>(path: string, params?: {}): Promise<T> => {
    return axios
      .post<T>(`${baseUrl}${path}`, params, {
        headers: getHeaders && getHeaders()
      })
      .then(response => response.data)
      .catch(error => {
        onError && onError(error)
        throw error
      })
  }

  const get = async <T>(path: string): Promise<T> => {
    return axios
      .get<T>(`${baseUrl}${path}`, { headers: getHeaders && getHeaders() })
      .then(response => response.data)
      .catch(error => {
        onError && onError(error)
        throw error
      })
  }

  return {
    get,
    post
  }
}
