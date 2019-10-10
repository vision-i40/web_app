import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './AuthProvider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
