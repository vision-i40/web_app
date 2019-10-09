import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import SignInPage from './SignInPage'

const PublicApp: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={SignInPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}

export default PublicApp
