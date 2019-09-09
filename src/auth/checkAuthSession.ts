import { AuthStorage } from './authTypes'

export default (storage: AuthStorage) => (): boolean => {
  return !!storage.getItem('session')
}
