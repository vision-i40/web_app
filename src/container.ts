import config from './config'
import makeHttpClient from './infra/httpClient'
import makeSecureHttpClient from './infra/secureHttpClient'
import makeSignIn from './signIn'
import makeAuthClient from './infra/authClient'
import makeAuthSession from './infra/authSession'
import makeGetUserProfile from './getUserProfile'
import makeGetCompanies from './getCompanies'
import makeGetProducts from './getProducts'
import makeGetProductionLines from './getProductionLines'
import makeGetProductionLine from './getProductionLine'
import makeGetProductionOrders from './getProductionOrders'
import makeGetCodeGroups from './getCodeGroups'
import makeGetReworkCodes from './getReworkCodes'
import makeGetWasteCodes from './getWasteCodes'
import makeGetStopCodes from './getStopCodes'
import makeCreateEvent from './createEvent'
import makeCreateManualStop from './createManualStop'
import makeCreateProductionOrder from './createProductionOrder'
import makeUpdateProductionOrderStatus from './updateProductionOrderStatus'

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
const getProducts = makeGetProducts({ httpClient: secureHttpClient })
const getProductionLines = makeGetProductionLines({
  httpClient: secureHttpClient
})
const getProductionLine = makeGetProductionLine({
  httpClient: secureHttpClient
})
const getProductionOrders = makeGetProductionOrders({
  httpClient: secureHttpClient
})
const getCodeGroups = makeGetCodeGroups({ httpClient: secureHttpClient })
const getReworkCodes = makeGetReworkCodes({ httpClient: secureHttpClient })
const getWasteCodes = makeGetWasteCodes({ httpClient: secureHttpClient })
const getStopCodes = makeGetStopCodes({ httpClient: secureHttpClient })
const createEvent = makeCreateEvent({
  httpClient: secureHttpClient
})
const createManualStop = makeCreateManualStop({
  httpClient: secureHttpClient
})
const createProductionOrder = makeCreateProductionOrder({
  httpClient: secureHttpClient
})
const updateProductionOrderStatus = makeUpdateProductionOrderStatus({
  httpClient: secureHttpClient
})

export default {
  secureHttpClient,
  authSession,
  signIn,
  getUserProfile,
  getProductionLines,
  getProductionLine,
  getProductionOrders,
  getCompanies,
  getProducts,
  getCodeGroups,
  getReworkCodes,
  getWasteCodes,
  getStopCodes,
  createEvent,
  createManualStop,
  createProductionOrder,
  updateProductionOrderStatus
}
