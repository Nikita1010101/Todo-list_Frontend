export const interactWithLocalStorage = (key: string, value?: unknown) => {
  if (value === undefined) {
    return JSON.parse(localStorage.getItem(key) || 'null')
  }
  localStorage.setItem(key, JSON.stringify(value))
}
