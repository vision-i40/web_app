import React from 'react'
import { Router, Redirect } from '@reach/router'
import SignInPage from './SignInPage'
import ProtectRoute from './ProtectRoute'
import ProductionLinesPage from './ProductionLinesPage'
import ProductionLinePage from './ProductionLinePage'
import CompaniesPage from './CompaniesPage'

const App: React.FC = () => {
  return (
    <Router>
      <Redirect noThrow from="/" to="/login" />

      <SignInPage path="/login" />

      <ProtectRoute path="/" redirectTo="/login">
        <CompaniesPage path="companies" />
        <ProductionLinesPage path="companies/:companyId/production_lines" />
        <ProductionLinePage path="companies/:companyId/production_lines/:productionLineId" />
      </ProtectRoute>
    </Router>
  )
}

export default App
