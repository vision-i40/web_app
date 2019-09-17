import React from 'react'
import { Router } from '@reach/router'
import SignInPage from './SignInPage'
import ProtectRoute from './ProtectRoute'
import ProductionLinesPage from './ProductionLinesPage'
import ProductionLinePage from './ProductionLinePage'

const App: React.FC = () => {
  return (
    <Router>
      <SignInPage path="/login" />

      <ProtectRoute path="/" redirectTo="/login">
        <ProductionLinesPage path="companies/:companyId/production_lines" />
        <ProductionLinePage path="companies/:companyId/production_lines/:productionLineId" />
      </ProtectRoute>
    </Router>
  )
}

export default App
