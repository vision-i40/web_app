export type Company = {
  id: ID
  corporate_name: string
}

export type ProductionLine = {
  id: ID
  name: string
  in_progress_order?: ProductionOrder
}

export type ProductionOrder = {
  product: Product
  code: string
  production_quantity: number
}

export type Product = {
  name: string
  units_of_measurement: UnitOfMeasurement[]
}

export type UnitOfMeasurement = {
  id: number
  name: string
}

export type HttpMethod = <T>(path: string, params?: {}) => Promise<T>

export type HttpError = {
  message: string
  response: {
    status: number
  }
}

export type HttpErrorHandler = (error: HttpError | Error) => void

export type HttpClient = {
  post: HttpMethod
  get: HttpMethod
  onError: (handler: HttpErrorHandler) => void
}

export type Credentials = {
  email: string
  password: string
}

export type AuthSessionData = {
  secret: string
  refresh: string
}

export type AuthStorage = {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
}

export type AuthClient = {
  signIn: (credentials: Credentials) => Promise<AuthSessionData>
}

export type AuthSession = {
  get: () => AuthSessionData | undefined
  isActive: () => boolean
  save: (session: AuthSessionData) => AuthSessionData
  clear: () => void
}

type ID = number | string
