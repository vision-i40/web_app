export const isEmpty = (value: any) => {
  if (!value) return true
  if (value === '') return true

  return false
}
