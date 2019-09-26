import baseConfig from './base'
const envConfig = require(`./env/${process.env.NODE_ENV}`)

type Config = {
  apiUrl: string
  auth: {
    activeRedirectPath: string
  }
}

const config: Config = {
  ...baseConfig,
  ...envConfig
}

export default config
