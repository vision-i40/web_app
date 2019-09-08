import { Credentials, AuthSession } from './AuthService'

export type SignInResponse = {
  access: string
  refresh: string
}

const AuthApi = () => ({
  async signIn(payload: Credentials): Promise<AuthSession> {
    return Promise.resolve({
      access: 'token-here',
      refresh: 'otherToken'
    }).then(signInResultToAuthSession)
  }
})

const signInResultToAuthSession = (
  signInResult: SignInResponse
): AuthSession => {
  return {
    refresh: signInResult.refresh,
    secret: signInResult.access
  }
}

export default AuthApi()
