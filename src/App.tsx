import React from 'react'
import { Router } from '@reach/router'
import BoardPage from './views/BoardPage'
import SignInPage from './views/SignInPage'
import ProtectRoute from './views/ProtectRoute'

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
