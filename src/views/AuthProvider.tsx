import React, { useState } from 'react'
import container from '../container'
import { Credentials } from '../types'

const AuthContext = React.createContext<{
  isAuthenticated: boolean
  signIn: (credentials: Credentials) => Promise<void>
  signOut: () => void
}>({
  isAuthenticated: false,
  signIn: (credentials: Credentials) =>
    Promise.reject('No Sign In function defined.'),
  signOut: () => {}
})

const AuthProvider: React.FC = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    container.authSession.isActive()
  )

  const signIn = (credentials: Credentials) =>
    container.signIn(credentials).then(() => setIsAuthenticated(true))

  const signOut = () => {
    container.authSession.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated }}
      {...props}
    />
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context
}

export { AuthProvider, useAuth }
