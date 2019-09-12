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
}

export type AuthClient = {
  signIn: (credentials: Credentials) => Promise<AuthSessionData>
}

export type AuthSession = {
  get(): AuthSessionData | undefined
  isActive(): boolean
  save(session: AuthSessionData): AuthSessionData
}
