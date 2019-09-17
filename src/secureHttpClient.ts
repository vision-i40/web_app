import { AuthSession } from './types'
import makeHttpClient from './httpClient'

type SecureHttpClientOptions = {
  authSession: AuthSession
  baseUrl: string
}

const secureHttpClient = ({ authSession, baseUrl }: SecureHttpClientOptions) =>
  makeHttpClient({
    baseUrl,
    getHeaders: () => {
      const sessionData = authSession.get()

      if (!sessionData) return

      return {
        authorization: `Bearer ${sessionData.secret}`
      }
    }
  })

export default secureHttpClient
