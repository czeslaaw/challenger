export function debounce<T extends any[]>(func: (...args: T) => void, delay: number): (...args: T) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
