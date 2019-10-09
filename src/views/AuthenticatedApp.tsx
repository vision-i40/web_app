import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import ProductionLinesPage from './ProductionLinesPage'
import ProductionLinePage from './ProductionLinePage'
import CompaniesPage from './CompaniesPage'

const AuthenticatedApp: React.FC = () => {
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
        <Redirect exact from="/login" to="/companies" />
        <Redirect exact from="/" to="/companies" />
        <Route>404</Route>
      </Switch>
    </Router>
  )
}

export default AuthenticatedApp
