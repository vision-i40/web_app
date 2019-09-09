import config from './config'
import makeHttpClient from './httpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeSaveAuthSession from './auth/saveAuthSession'
import makeCheckAuthSession from './auth/checkAuthSession'

// Clients
const httpClient = makeHttpClient(config.apiUrl)
const authClient = makeAuthClient(httpClient)

// Auth Use Cases
const authStorage = window.localStorage
const saveAuthSession = makeSaveAuthSession(authStorage)
const checkAuthSession = makeCheckAuthSession(authStorage)
const signIn = makeSignIn({ authClient, saveAuthSession })

export default {
  signIn,
  checkAuthSession
}
