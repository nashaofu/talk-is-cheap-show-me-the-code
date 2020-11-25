// 这里先输出 setTimeout
// 然后在输出 setImmediate
setTimeout(() => {
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  setImmediate(() => {
    console.log('setImmediate')
  })
}, 0)
