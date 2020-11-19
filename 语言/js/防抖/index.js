function debounce(fn, delay, immediate) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    if (immediate && timer === undefined) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      timer = undefined
      fn.apply(this, args)
    }, delay)
  }
}
