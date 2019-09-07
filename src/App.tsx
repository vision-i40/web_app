import React from 'react'
import { Router } from '@reach/router'
import BoardPage from './BoardPage'
import SignInPage from './SignInPage'

const App: React.FC = () => {
  return (
    <Router>
      <BoardPage path="/board"></BoardPage>
      <SignInPage path="/login"></SignInPage>
    </Router>
  )
}

export default App
