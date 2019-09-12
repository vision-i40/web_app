import { AuthStorage, AuthSession } from './authTypes'

export default (storage: AuthStorage) => (): AuthSession | undefined => {
  const value = storage.getItem('session')

  if (!value) return

  return JSON.parse(value)
}
