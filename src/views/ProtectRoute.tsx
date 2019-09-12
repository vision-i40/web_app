import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import container from '../container'

type ProtectRouteState = {
  isSafe: boolean
}

type ProtectRouteProps = {
  redirectTo: string
}

const ProtectRoute: React.FC<ProtectRouteProps & RouteComponentProps> = ({
  children,
  redirectTo,
  navigate
}) => {
  const [state, setState] = useState<ProtectRouteState>({ isSafe: false })
  useEffect(() => {
    container.authSession.isActive()
      ? setState({ isSafe: true })
      : navigate && navigate(redirectTo)
  }, [navigate, redirectTo])

  return <>{state.isSafe && children}</>
}

export default ProtectRoute
