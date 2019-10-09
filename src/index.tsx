import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import * as serviceWorker from './infra/serviceWorker'
import './views/styles/app.scss'
import { AuthProvider } from './views/AuthProvider'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
