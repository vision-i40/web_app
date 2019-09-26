import config from './config'
import makeHttpClient from './httpClient'
import makeSecureHttpClient from './secureHttpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeAuthSession from './auth/authSession'
import makeGetUserProfile from './profile/getUserProfile'
import makeGetCompanies from './getCompanies'
import makeGetProductionLines from './getProductionLines'
import makeGetProductionLine from './getProductionLine'

// Infra
const httpClient = makeHttpClient({ baseUrl: config.apiUrl })
const authClient = makeAuthClient(httpClient)
const authStorage = window.localStorage
const authSession = makeAuthSession(authStorage)
const secureHttpClient = makeSecureHttpClient({
  baseUrl: config.apiUrl,
  authSession: authSession
})

// Use cases
const signIn = makeSignIn({ authClient, authSession })
const getUserProfile = makeGetUserProfile({ httpClient: secureHttpClient })
const getCompanies = makeGetCompanies({ httpClient: secureHttpClient })
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
  getProductionLine,
  getCompanies
}
