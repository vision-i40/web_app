import ServerRequest from './ServerRequest'

export type Credentials = {
  email: string
  password: string
}

export type AuthSession = {
  secret: string
  refresh: string
}

export type AuthServiceOptions = {
  request?: ReturnType<typeof ServerRequest>
}

type SignInResponse = {
  access: string
  refresh: string
}

const AuthService = ({ request }: AuthServiceOptions = {}) => ({
  async signIn(credentials: Credentials): Promise<AuthSession> {
    if(!request) throw new Error('You should set a ServerRequest to use the signIn()')
    
    return request.send<SignInResponse>({
      method: 'post',
      path: '/auth/signin',
      params: credentials
    })
    .then(signResponseToAuthSession)
    .then(saveAuthSession)
  },

  isAuthenticated(): boolean {
    return getAuthSession() !== undefined
  }
})

const signResponseToAuthSession = (signInResponse: SignInResponse): AuthSession => {
  return {
    secret: signInResponse.access,
    refresh: signInResponse.refresh
  }
}

const saveAuthSession = (authSession: AuthSession) => {
  window.localStorage.setItem('session', JSON.stringify(authSession))
  return authSession
}

const getAuthSession = (): AuthSession | undefined => {
  const authSessionJSON = window.localStorage.getItem('session')
  return authSessionJSON ? JSON.parse(authSessionJSON) : undefined
}

export default AuthService
