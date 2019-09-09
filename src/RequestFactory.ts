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
  const { REACT_APP_API_URL } = process.env

  if(!REACT_APP_API_URL) throw new Error('No process.env.REACT_APP_API_URL was defined.')
  
  return REACT_APP_API_URL
}

export default {
  createRequest,
  createServerRequest
}