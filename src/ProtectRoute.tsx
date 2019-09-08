import React, { useEffect, useState } from 'react'
import AuthService from './AuthService'
import { RouteComponentProps } from '@reach/router'

type ProtectRouteState = {
  isSafe: boolean
}

type ProtectRouteProps = {
  redirectTo: string
}

const authService = AuthService()

const ProtectRoute: React.FC<ProtectRouteProps & RouteComponentProps> = ({
  children,
  redirectTo,
  navigate
}) => {
  const [state, setState] = useState<ProtectRouteState>({ isSafe: false })
  useEffect(() => {
    authService.isAuthenticated()
      ? setState({ isSafe: true })
      : navigate && navigate(redirectTo)
  }, [navigate, redirectTo])

  return <>{state.isSafe && children}</>
}

export default ProtectRoute
