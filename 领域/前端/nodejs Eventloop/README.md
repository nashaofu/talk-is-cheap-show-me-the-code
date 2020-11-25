# nodejs Event loop

执行顺序

1. timers: 执行setTimeout和setInterval的回调
2. pending callbacks: 执行延迟到下一个循环迭代的 I/O 回调
3. idle, prepare: 仅系统内部使用
4. poll: 检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。
5. check: setImmediate在这里执行
6. close callbacks: 一些关闭的回调函数，如：socket.on('close', ...)


## setTimeout和setImmediate区别

setImmediate总是在evenloop的check阶段执行，通常来说晚于timer，但如下代码，输出顺序不一致。造成原因是因为setTimeout最小延迟时间在node中是1ms，所以在第一次事件循环中可能timer没有到期，并不会执行，但是setImmediate一定会执行

```js
// setTimeout setImmediate 输出顺序是随机的
// 因为setTimeout延迟最小为1ms
setTimeout(() => {
  console.log('setTimeout')
})

setImmediate(() => {
  console.log('setImmediate')
})
```
