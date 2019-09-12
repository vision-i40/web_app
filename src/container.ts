import config from './config'
import makeHttpClient from './httpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeSaveAuthSession from './auth/saveAuthSession'
import makeCheckAuthSession from './auth/checkAuthSession'
import makeGetAuthSession from './auth/getAuthSession'
import makeGetUserProfile from './profile/getUserProfile'

// Clients
const httpClient = makeHttpClient(config.apiUrl)
const authClient = makeAuthClient(httpClient)

// Auth Use Cases
const authStorage = window.localStorage
const saveAuthSession = makeSaveAuthSession(authStorage)
const checkAuthSession = makeCheckAuthSession(authStorage)
const getAuthSession = makeGetAuthSession(authStorage)
const signIn = makeSignIn({ authClient, saveAuthSession })

// API Use Cases
const makeAuthHeaders = () => {
  const authSession = getAuthSession()

  if (!authSession) return

  return {
    authorization: `Bearer ${authSession.secret}`
  }
}

const secureHttpClient = makeHttpClient(config.apiUrl, makeAuthHeaders)
const getUserProfile = makeGetUserProfile({ httpClient: secureHttpClient })

export default {
  signIn,
  checkAuthSession,
  getUserProfile
}
