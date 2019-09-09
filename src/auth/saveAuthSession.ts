import { AuthStorage, AuthSession } from './types'

export default (storage: AuthStorage) => (session: AuthSession) => {
  storage.setItem('session', JSON.stringify(session))
  return session
}
