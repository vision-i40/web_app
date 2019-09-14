import React from 'react'
import { Router } from '@reach/router'
import BoardPage from './BoardPage'
import SignInPage from './SignInPage'
import ProtectRoute from './ProtectRoute'
import ProductionLinesPage from './ProductionLinesPage'

const App: React.FC = () => {
  return (
    <Router>
      <SignInPage path="/login"></SignInPage>

      <ProtectRoute path="/" redirectTo="/login">
        <BoardPage path="board"></BoardPage>
        <ProductionLinesPage path="companies/:companyId/production_lines"></ProductionLinesPage>
      </ProtectRoute>
    </Router>
  )
}

export default App
