export type Credentials = {
  email: string
  password: string
}

export type AuthSession = {
  secret: string
  refresh: string
}

export type AuthStorage = {
  setItem: (key: string, value: string) => void
}

export type AuthClient = {
  signIn: (credentials: Credentials) => Promise<AuthSession>
}
