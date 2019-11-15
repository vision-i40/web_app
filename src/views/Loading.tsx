import React from 'react'
import spinner from './images/spinner.svg'

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner">
        <img src={spinner} alt="" />
      </div>
    </div>
  )
}

export default Loading
