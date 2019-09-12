export type HttpMethod = <T>(path: string, params?: {}) => Promise<T>

export type HttpClient = {
  post: HttpMethod
  get: HttpMethod
}
