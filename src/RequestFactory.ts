import axios from 'axios'

export type Request = {
  send: <T>({ method, path, params }: SendOptions) => Promise<T>
}

type RequestOptions = {
  token?: string
  baseURL: string
}

type SendOptions = {
  method: Method,
  path: string,
  params?: any,
  token?: string
}

type Method = 'post' | 'get'

const createRequest = ({ token, baseURL }: RequestOptions): Request => {
  return {
    async send <T>({ method, path, params }: SendOptions): Promise<T> {
      return axios.request<T>({
        method,
        baseURL,
        params,
        url: path,
        headers: {
          ['Authorization']: `Bearer ${token}`
        }
      }).then(result => result.data)
    }
  }
}

const createServerRequest = () => createRequest({
  baseURL: getServerUrlOrThrowError()
})

const getServerUrlOrThrowError = (): string => {
  const { API_URL } = process.env

  if(!API_URL) throw new Error('No process.env.API_URL was defined.')
  
  return API_URL
}

export default {
  createRequest,
  createServerRequest
}