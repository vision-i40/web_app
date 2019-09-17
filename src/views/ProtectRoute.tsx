import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import container from '../container'
import { HttpError } from '../types'

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
    container.secureHttpClient.onError((error: HttpError | Error) => {
      if (!('response' in error)) return

      const { status } = error.response

      if (status === 401) {
        container.authSession.clear()
        navigate && navigate(redirectTo)
      }
    })

    container.authSession.isActive()
      ? setState({ isSafe: true })
      : navigate && navigate(redirectTo)
  }, [navigate, redirectTo])

  return <>{state.isSafe && children}</>
}

export default ProtectRoute
