export type HttpClient = {
  post: <T>(path: string, params: any, headers?: {[key: string]: string}) => Promise<T>
}