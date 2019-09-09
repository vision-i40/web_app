import React from 'react'
import { Router } from '@reach/router'
import BoardPage from './BoardPage'
import SignInPage from './SignInPage'
import ProtectRoute from './ProtectRoute'

const App: React.FC = () => {
  return (
    <Router>
      <SignInPage path="/login"></SignInPage>

      <ProtectRoute path="/*" redirectTo="/login">
        <BoardPage path="/board"></BoardPage>
      </ProtectRoute>
    </Router>
  )
}

export default App
