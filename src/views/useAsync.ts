import { useState, useCallback, useMemo } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

type AsyncState<T, U = Error> = {
  status: 'idle' | 'loading' | 'finished' | 'failed'
  data?: T
  error?: U
}

type AsyncOptions<T> = {
  onLoad?: boolean
  args?: T | []
}

export default <T extends any[], U>(
  asyncFn: (...args: T) => Promise<U>,
  { onLoad, args }: AsyncOptions<T> = {}
) => {
  const usableArgs = useMemo(() => args || [], [args]) as T
  const [state, setState] = useState<AsyncState<U>>({
    status: 'idle'
  })

  const run = useCallback(
    (...args: T) => {
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
    },
    [asyncFn]
  )

  const reload = useCallback(() => {
    run(...usableArgs)
  }, [run, usableArgs])

  useDeepCompareEffect(() => {
    if (onLoad) {
      run(...usableArgs)
    }
  }, [run, onLoad, usableArgs])

  return {
    run,
    reload,
    status: state.status,
    data: state.data,
    error: state.error,
    isLoading: state.status === 'loading',
    isFinished: state.status === 'finished'
  }
}
