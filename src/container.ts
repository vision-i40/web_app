import config from './config'
import makeHttpClient from './httpClient'
import makeSecureHttpClient from './secureHttpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeAuthSession from './auth/authSession'
import makeGetUserProfile from './profile/getUserProfile'
import makeGetProductionLines from './getProductionLines'
import makeGetProductionLine from './getProductionLine'

// Clients
const httpClient = makeHttpClient({ baseUrl: config.apiUrl })
const authClient = makeAuthClient(httpClient)

// Auth Use Cases
const authStorage = window.localStorage
const authSession = makeAuthSession(authStorage)
const signIn = makeSignIn({ authClient, authSession })

// API Use Cases=
const secureHttpClient = makeSecureHttpClient({
  baseUrl: config.apiUrl,
  authSession: authSession
})
const getUserProfile = makeGetUserProfile({ httpClient: secureHttpClient })
const getProductionLines = makeGetProductionLines({
  httpClient: secureHttpClient
})
const getProductionLine = makeGetProductionLine({
  httpClient: secureHttpClient
})

export default {
  secureHttpClient,
  authSession,
  signIn,
  getUserProfile,
  getProductionLines,
  getProductionLine
}
