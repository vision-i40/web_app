import React from 'react'
import { Router } from '@reach/router'
import BoardPage from './BoardPage'

const App: React.FC = () => {
  return (
    <Router>
      <BoardPage path="/board"></BoardPage>
    </Router>
  )
}

export default App
