import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import ProductionLinesPage from './ProductionLinesPage'
import ProductionLinePage from './ProductionLinePage'
import CompaniesPage from './CompaniesPage'
import { useAuth } from './AuthProvider'
import container from '../container'
import ProductionLinePlanPage from './ProductionLinePlanPage'

const AuthenticatedApp: React.FC = () => {
  const { signOut } = useAuth()

  useEffect(() => {
    container.secureHttpClient.onError(error => {
      if (error.response.status === 401) {
        signOut()
      }
    })
  }, [signOut])

  return (
    <Router>
      <Switch>
        <Route exact path="/companies" component={CompaniesPage} />
        <Route
          exact
          path="/companies/:companyId/production_lines"
          component={ProductionLinesPage}
        />
        <Route
          exact
          path="/companies/:companyId/production_lines/:productionLineId"
          component={ProductionLinePage}
        />
        <Route
          exact
          path="/companies/:companyId/production_lines/:productionLineId/plan"
          component={ProductionLinePlanPage}
        />
        <Redirect exact from="/login" to="/companies" />
        <Redirect exact from="/" to="/companies" />
        <Route>404</Route>
      </Switch>
    </Router>
  )
}

export default AuthenticatedApp
