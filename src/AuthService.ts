import AuthApi from './AuthApi'

export type Credentials = {
  email: string
  password: string
}

export type AuthSession = {
  secret: string
  refresh: string
}

export type AuthApiClient = {
  signIn: (credentials: Credentials) => Promise<AuthSession>
}

const AuthService = (api: AuthApiClient) => ({
  async signIn(credentials: Credentials): Promise<AuthSession> {
    return api.signIn(credentials).then(saveAuthSession)
  },

  isAuthenticated(): boolean {
    return getAuthSession() !== undefined
  }
})

const saveAuthSession = (authSession: AuthSession) => {
  window.localStorage.setItem('session', JSON.stringify(authSession))
  return authSession
}

const getAuthSession = (): AuthSession | undefined => {
  const authSessionJSON = window.localStorage.getItem('session')
  return authSessionJSON ? JSON.parse(authSessionJSON) : undefined
}

export default AuthService(AuthApi)
