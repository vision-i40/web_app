import { useState, useCallback } from 'react'

export const useToggle = (
  initialValue: boolean = false
): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => setValue(value => !value), [])

  return [value, toggle]
}
