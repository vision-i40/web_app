import { HttpClient } from '../types'
import { AuthClient, Credentials } from './authTypes'

type SignInResponse = {
  access: string
  refresh: string
}

export default (httpClient: HttpClient): AuthClient => ({
  async signIn(credentials: Credentials) {
    return httpClient
      .post<SignInResponse>('/auth/token', credentials)
      .then(signInResponseToAuthSession)
  }
})

const signInResponseToAuthSession = (response: SignInResponse) => ({
  secret: response.access,
  refresh: response.refresh
})
