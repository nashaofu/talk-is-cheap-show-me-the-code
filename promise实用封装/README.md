# promise 实用封装

```bash
.
├── P.js # 创建P类，继承于Promise，但添加了静态方法
├── Promise.js # 实现Promise，未能按Promise A+规范实现，主要讲解原理
├── PromiseStatic.js # 实现Promise 的静态方法，主要医原理实现为主，不严谨
├── parallelResolveOnce.js # 并行Promise，其中又一个成功则整个任务完成并切整个任务成功
├── resolveOnce.js  # parallelResolveOnce与serialResolveOnce执行示例
└── serialResolveOnce.js  # 串行Promise，直到又一个成功就结束整个进程，并切整个任务成功
```

## [parallel-to-serial](https://github.com/nashaofu/parallel-to-serial)

串行执行 Promise 任务，同时也可以用如下代码

```js
function makePromise (delay, result) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log(result)
      result instanceof Error ? reject(result) : resolve(result)
    }, delay)
  })
}

const items = [
  () => makePromise(1000, 1),
  () => makePromise(1000, 2),
  () => makePromise(1000, new Error('4')),
  () => makePromise(1000, 4),
]

async function run(items) {
  for (let i = 0; i < items.length; i++) {
    await items[i]()
  }
}
// 也可以用以下代码
items.reduce((prev,next) => prev.then(next), Promise.resolve())

// 或者如下代码
items.reduce(async (prev,next) => {
  await prev
  return next()
}, Promise.resolve())
```
