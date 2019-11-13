export type Company = {
  id: ID
  corporate_name: string
}

export type ProductionLine = {
  id: ID
  name: string
  turn?: string
  in_progress_order?: ProductionOrder
}

export type ProductionOrder = {
  id: ID
  product: Product
  code: string
  production_quantity: number
  rework_quantity: number
  waste_quantity: number
  quantity: number
  state?: 'InProgress' | 'Released' | 'Interrupted' | 'Done'
}

export type Product = {
  id: ID
  name: string
  units_of_measurement: UnitOfMeasurement[]
}

export type UnitOfMeasurement = {
  id: number
  name: string
}

export type CodeGroup = {
  id: ID
  name: string
  groupType: GroupTypes
}

export type GroupTypes = 'StopCode' | 'ReworkCode' | 'WasteCode'

export type ReworkCode = {
  id: string
  name: string
}

export type WasteCode = {
  id: string
  name: string
}

export type StopCode = {
  id: string
  name: string
}

export type HttpMethod = <T>(path: string, params?: {}) => Promise<T>

export type HttpError = {
  message: string
  response: {
    status: number
  }
}

export type HttpErrorHandler = (error: HttpError) => void

export type HttpClient = {
  post: HttpMethod
  patch: HttpMethod
  put: HttpMethod
  get: HttpMethod
  onError: (errorHandler: HttpErrorHandler) => void
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

export type ID = number | string
