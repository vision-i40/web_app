import { AuthClient, Credentials, AuthSession } from './types'
import makeSaveAuthSession from './saveAuthSession'

type SignInDependencies = {
  authClient: AuthClient
  saveAuthSession: ReturnType<typeof makeSaveAuthSession>
}

export default ({ authClient, saveAuthSession }: SignInDependencies) => (
  credentials: Credentials
): Promise<AuthSession> => {
  return authClient.signIn(credentials).then(saveAuthSession)
}
