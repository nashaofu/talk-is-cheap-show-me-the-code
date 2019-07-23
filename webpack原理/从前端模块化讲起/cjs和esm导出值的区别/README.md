# cjs 和 esm 导出值得区别

cjs 导出为值的拷贝，esm 导出的是值的引用

cjs 导出的拷贝值在外部改变后再倒入模块会以改变后的值为准

```js
// index.js
const mod = require('./lib')

// 此处输出值？
console.log(mod.counter++)
mod.incCounter()

// 此处输出值？
console.log(mod.counter)
console.log(require('./lib')) // 会输出修改后的值
```

esm 不允许直接修改导出的值

```js
// index.mjs
import * as mod from './lib'

console.log(mod.counter) // 3
mod.incCounter()
mod.counter++ // 此行会报错
mod.incCounter.a = 12 // 不会报错
console.log(mod.counter) // 3
```
