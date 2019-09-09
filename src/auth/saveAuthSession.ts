import { AuthStorage, AuthSession } from './authTypes'

export default (storage: AuthStorage) => (session: AuthSession) => {
  storage.setItem('session', JSON.stringify(session))
  return session
}
