import {
  AuthClient,
  Credentials,
  AuthSessionData,
  AuthSession
} from './authTypes'

type SignInDependencies = {
  authClient: AuthClient
  authSession: AuthSession
}

export default ({ authClient, authSession }: SignInDependencies) => (
  credentials: Credentials
): Promise<AuthSessionData> => {
  return authClient.signIn(credentials).then(authSession.save)
}
