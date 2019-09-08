import { useState } from 'react'

type ToggleState = { [key: string]: boolean }

export const useToggle = (names: string[]) => {
  const initialState = mountToggleState(names)
  const [state, setState] = useState(initialState)

  const toggle = (name: string) => () => {
    setState(state => ({
      ...state,
      [name]: !state[name]
    }))
  }

  const getToggleValue = (name: string) => {
    return state[name]
  }

  return {
    toggle,
    getToggleValue
  }
}

const mountToggleState = (names: string[]) => {
  return names.reduce(
    (currentState: ToggleState, name: string): ToggleState => {
      return {
        ...currentState,
        [name]: false
      }
    },
    {}
  )
}
