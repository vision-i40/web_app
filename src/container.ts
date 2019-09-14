import config from './config'
import makeHttpClient from './httpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeAuthSession from './auth/authSession'
import makeGetUserProfile from './profile/getUserProfile'
import makeGetProductionLines from './getProductionLines'

// Clients
const httpClient = makeHttpClient(config.apiUrl)
const authClient = makeAuthClient(httpClient)

// Auth Use Cases
const authStorage = window.localStorage
const authSession = makeAuthSession(authStorage)
const signIn = makeSignIn({ authClient, authSession })

// API Use Cases
const makeAuthHeaders = () => {
  const sessionData = authSession.get()

  if (!sessionData) return

  return {
    authorization: `Bearer ${sessionData.secret}`
  }
}

const secureHttpClient = makeHttpClient(config.apiUrl, makeAuthHeaders)
const getUserProfile = makeGetUserProfile({ httpClient: secureHttpClient })
const getProductionLines = makeGetProductionLines({
  httpClient: secureHttpClient
})

export default {
  signIn,
  authSession,
  getUserProfile,
  getProductionLines
}
