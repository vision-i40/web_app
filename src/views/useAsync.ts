import { useState, useEffect, useCallback } from 'react'

type AsyncState<T, U = Error> = {
  status: 'idle' | 'loading' | 'finished' | 'failed'
  data?: T
  error?: U
}

type AsyncOptions = {
  onLoad?: boolean
  args?: any[]
}

type AsyncFunction = (() => Promise<any>) | ((...args: any[]) => Promise<any>)

export default <T>(
  asyncFn: AsyncFunction,
  { onLoad, args }: AsyncOptions = {}
) => {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle'
  })

  const run = useCallback((...args: any[]) => {
    setState(state => ({
      ...state,
      status: 'loading'
    }))

    asyncFn(...args)
      .then(data =>
        setState({
          data,
          status: 'finished',
          error: undefined
        })
      )
      .catch(error => {
        setState(state => ({
          ...state,
          status: 'failed',
          error
        }))
      })
  }, [])

  useEffect(() => {
    if (onLoad) {
      args ? run(...args) : run()
    }
  }, [])

  return {
    run,
    status: state.status,
    data: state.data,
    error: state.error,
    isLoading: state.status === 'loading',
    isFinished: state.status === 'finished'
  }
}
