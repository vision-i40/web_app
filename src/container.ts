import makeHttpClient from './httpClient'
import makeSignIn from './auth/signIn'
import makeAuthClient from './auth/authClient'
import makeSaveAuthSession from './auth/saveAuthSession'

// Clients
const httpClient = makeHttpClient()
const authClient = makeAuthClient(httpClient)

// Auth Use Cases
const authStorage = window.localStorage
const saveAuthSession = makeSaveAuthSession(authStorage)
const signIn = makeSignIn({ authClient, saveAuthSession })

export default {
  signIn
}
