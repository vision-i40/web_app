import axios from 'axios'

type Method = 'post' | 'get'

type ServerRequestOptions = {
  token?: string
}

export type RequestConfig = {
  method: Method,
  path: string,
  params?: any,
  token?: string
}

const ServerRequest = ({ token }: ServerRequestOptions = {}) => ({
  async send <T>({ method, path, params }: RequestConfig): Promise<T> {
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
})

const getApiUrlOrThrowError = (): string => {
  const { API_URL } = process.env

  if(!API_URL) throw new Error('No process.env.API_URL was defined.')
  
  return API_URL
}

export default ServerRequest