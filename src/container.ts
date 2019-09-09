import makeHttpClient from './httpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeSaveAuthSession from './auth/saveAuthSession'
import makeCheckAuthSession from './auth/checkAuthSession'

// Clients
const httpClient = makeHttpClient('https://vision-i40-staging.herokuapp.com')
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
