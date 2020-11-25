console.log('main')
Promise.resolve().then(() => {
  console.log('Promise')
})
process.nextTick(() => {
  console.log('nextTick')
})
setTimeout(function () {
  console.log('setTimeout') // 这一行在 timer 阶段执行
  Promise.resolve().then(() => {
    console.log('Promise1')
  })
  process.nextTick(() => {
    console.log('nextTick')
  })
})

setImmediate(() => {
  console.log('setImmediate')
  Promise.resolve().then(() => {
    console.log('Promise12')
  })
})
