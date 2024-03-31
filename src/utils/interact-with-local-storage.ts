export const interactWithLocalStorage = (key: string, value?: unknown) => {
  if (value === undefined) {
    return localStorage.getItem(key)
  }

  localStorage.setItem(key, String(value))
}
