import config from './config'
import makeHttpClient from './infra/httpClient'
import makeSecureHttpClient from './infra/secureHttpClient'
import makeSignIn from './signIn'
import makeAuthClient from './infra/authClient'
import makeAuthSession from './infra/authSession'
import makeGetUserProfile from './getUserProfile'
import makeGetCompanies from './getCompanies'
import makeGetProductionLines from './getProductionLines'
import makeGetProductionLine from './getProductionLine'
import makeCreateEvent from './createEvent'
import { HttpError } from './types'

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
const createEvent = makeCreateEvent({
  httpClient: secureHttpClient
})

export default {
  secureHttpClient,
  authSession,
  signIn,
  getUserProfile,
  getProductionLines,
  getProductionLine,
  getCompanies,
  createEvent
}
