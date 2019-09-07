import { useState } from 'react'

type TogglesState = { [key: string]: boolean }

export const useToggles = (names: string[]) => {
  const initialState = mountTogglesState(names)
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

const mountTogglesState = (names: string[]) => {
  return names.reduce(
    (currentState: TogglesState, name: string): TogglesState => {
      return {
        ...currentState,
        [name]: false
      }
    },
    {}
  )
}
