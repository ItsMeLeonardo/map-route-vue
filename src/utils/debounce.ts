export const debounce = (func: Function, wait: number) => {
  let timeout: number
  return function () {
    const args: IArguments = arguments
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
