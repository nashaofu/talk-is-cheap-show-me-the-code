function throttle(fn, time) {
  let timer
  return (...args) => {
    if (!timer) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, time)
    }
  }
}
