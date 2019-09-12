import { AuthStorage, AuthSessionData, AuthSession } from '../types'

const authSession = (storage: AuthStorage): AuthSession => {
  return {
    get(): AuthSessionData | undefined {
      const value = storage.getItem('session')

      if (!value) return

      return JSON.parse(value)
    },

    isActive() {
      return !!storage.getItem('session')
    },

    save(session: AuthSessionData) {
      storage.setItem('session', JSON.stringify(session))
      return session
    }
  }
}

export default authSession
