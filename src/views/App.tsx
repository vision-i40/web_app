import React from 'react'
import NotificationProvider from './NotificationProvider'
import AuthenticatedApp from './AuthenticatedApp'
import PublicApp from './PublicApp'
import { useAuth } from './AuthProvider'

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <NotificationProvider>
      {isAuthenticated ? <AuthenticatedApp /> : <PublicApp />}
    </NotificationProvider>
  )
}

export default App
