import axios from 'axios'

export type ServerRequest = {
  send: <T>({ method, path, params }: SendOptions) => Promise<T>
}

type ServerRequestOptions = {
  token?: string
}

type SendOptions = {
  method: Method,
  path: string,
  params?: any,
  token?: string
}

type Method = 'post' | 'get'

const createRequest = ({ token }: ServerRequestOptions = {}): ServerRequest => {
  return {
    async send <T>({ method, path, params }: SendOptions): Promise<T> {
      return axios.request<T>({
        method,
        url: path,
        baseURL: getApiUrlOrThrowError(),
        params: params,
        headers: {
          ['Authorization']: `Bearer ${token}`
        }
      }).then(result => result.data)
    }
  }
}

const getApiUrlOrThrowError = (): string => {
  const { API_URL } = process.env

  if(!API_URL) throw new Error('No process.env.API_URL was defined.')
  
  return API_URL
}

export default {
  createRequest
}