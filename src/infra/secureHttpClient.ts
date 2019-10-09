import { AuthSession, HttpErrorHandler } from '../types'
import makeHttpClient from './httpClient'

type SecureHttpClientOptions = {
  authSession: AuthSession
  baseUrl: string
  onError?: HttpErrorHandler
}

const secureHttpClient = ({
  authSession,
  baseUrl,
  onError
}: SecureHttpClientOptions) =>
  makeHttpClient({
    baseUrl,
    onError,
    getHeaders: () => {
      const sessionData = authSession.get()

      if (!sessionData) return

      return {
        authorization: `Bearer ${sessionData.secret}`
      }
    }
  })

export default secureHttpClient
