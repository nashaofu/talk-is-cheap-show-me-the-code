// setTimeout setImmediate 输出顺序是随机的
// 因为setTimeout延迟最小为1ms
setTimeout(() => {
  console.log('setTimeout')
})

setImmediate(() => {
  console.log('setImmediate')
})

