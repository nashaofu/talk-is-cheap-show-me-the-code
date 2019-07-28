# Webpack 原理-从前端模块化开始

## 源码目录

1. [AMD 与 CMD](./AMD与CMD/README.md)
2. [cjs 和 esm 导出值的区别](./cjs和esm导出值的区别/README.md)
3. [cycles](./cycles/README.md)

## 当前主流 JS 模块化方案

- CommonJS 规范，nodejs 实现的规范
- AMD 规范，requirejs 实现的规范
- CMD 规范，seajs 实现的规范， seajs 与 requirejs 实现原理有很多相似的地方 u ES Modules，当前 js 标准模块化方案

注意:cjs、amd、cmd、 ES Modules 都是只规范，所以可能对应有多种实现

下面就对各个模块化方案做简单说明

## 无模块化时代

![一把梭](https://upload-images.jianshu.io/upload_images/6492782-e4bcb065b6484a1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```html
<script src="jquery.js"></script>
<script src="jquery_scroller.js"></script>
<script src="main.js"></script>
<script src="other1.js"></script>
<script src="other2.js"></script>
<script src="other3.js"></script>
```

无模块化时代的问题

- 污染全局作用域
- 不便于拆分逻辑，维护成本高 • 依赖关系不明显
- 复用性差

## CommonJS 规范

- CommonJS 是由 node 实现的一套规范，关于 CommonJS 的提出可参考[CommonJS 规范](https://zhaoda.net/webpack-handbook/commonjs.html)
- require 源码解读可参考 [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
- 模块包装相当于执行如下代码， compiledWrapper 是调用 node 封装的 V8 原生创建函数的方法返回的一个函数

```js
function compiledWrapper(exports, require, module, __filename, __dirname) {
  // 插入文件中的代码
  // 返回导出对象
  return module.exports
}
compiledWrapper.call(exports, exports, require, module, filename, dirname)
```

- CommonJS 模块输出的是一个值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
- 如下有两个文件，执行命令`node index.js`，会有什么结果?

lib.js

```js
// lib.js
let counter = 3
function incCounter() {
  counter++
}
module.exports = {
  counter,
  incCounter
}
```

index.js

```js
// index.js
const mod = require('./lib') // 此处输出值？
console.log(mod.counter)
mod.incCounter() // 此处输出值？
console.log(mod.counter)
```

- equire 命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象，下次加载会直接从缓存中取数据
- 以下是一个循环引用的例子，请问执行 node main.js 后会输出什么？

a.js

```js
// a.js
console.log('a starting')
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```

b.js

```js
// b.js
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```

main.js

```js
// main.js
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
```

## AMD 规范

- AMD 是 Asynchronous Module Definition 的简写，即异步模块定义
- AMD 规范的完整定义可参考 https://github.com/amdjs/amdjs-api/wiki/AMD
- requirejs 是在浏览器中运行的，所有一些基础库需要先配置，以方便其他库调用，可以理解为 CommonJS 中的 node_modules 下的包。业务模块也可定义在其中，可认为是路径别名。paths 中的路径不能包含扩展名。

```js
require.config({
  paths: {
    // 如果第一个加载失败就会加载第二个
    jquery: ['lib/jquery.min', 'lib/jquery'],
    lodash: 'lib/lodash.min',
    main: './mian' // 入口文件
  }
})
```

### 定义模块

```js
/**
* 定义模块，当依赖加载完成后执行回调
* 回调可返回值，返回值会被导出到外部使用
* @param {String} id 模块名称，可省略
* @param {Array} dependencies 依赖的模块
* @param {Function} factory 回调函数
*/
define(id?, dependencies?, factory);

```

```js
define(['jquery'], function($) {
  $('body').css({ background: 'red' })
  // 导出log函数
  return (...args) => console.log('自定义log', ...args)
})
```

### 加载模块

```js
/**
 * 加载模块
 * @param {Array} deps 要加载的模块
 * @param {Function} callback 加载成功回调，回调参数为加载模块导出对象
 * @param {Function} errback 加载失败回调
 */
requirejs(deps, callback, errback)
```

```js
require(['main'], log => {
  log('我成功加载了‘)
  // do something...,也可以在这里继续require其他js文件
})
```

### requirejs 使用示例

- 目录结构

```bash
.
├── index.html
└── js
    ├── lib
    │   ├── jquery.js
    │   ├── lodash.js
    │   └── require.js
    ├── main.js
    └── time.js
```

- index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>requirejs-demo</title>
  </head>
  <body>
    <h1 id="time"></h1>
    <script src="./js/lib/require.js" data-main="./js/main.js"></script>
  </body>
</html>
```

- main.js

```js
requirejs.config({
  baseUrl: '/js/‘,
  paths: {
    jquery: './lib/jquery‘,
    lodash: './lib/lodash‘
  }
})require(['jquery', './js/time.js'], ($, time) => {
  $('#time').text('TIME: ' + time.getTime())
  setInterval(() => {
   $('#time').text('TIME: ' + time.getTime())
  }, 1000)
})
```

- time.js

```js
define(['jquery', 'lodash'], ($, _) => ({
  getTime() {
    const time = new Date()
    const year = time.getFullYear()
    const month = _.padStart(time.getMonth() + 1, 2, '0‘)
    const date = _.padStart(time.getDate(), 2, '0‘)
    const hour = _.padStart(time.getHours(), 2, '0‘)
    const minute = _.padStart(time.getMinutes(), 2, '0‘)
    const second = _.padStart(time.getSeconds(), 2, '0‘)
    return `${year}/${month}/${date} ${hour}:${minute}:${second}`
  }
}))
```

## CMD 规范

- CMD 是 Common Module Definition 的简写，即通用模块定义
- CMD 规范的完整定义可参考https://github.com/seajs/seajs/issues/242
- CMD 的主要代表是 seajs。CMD 推崇依赖就近，AMD 推崇依赖前置。即 AMD 在定义模块的时候就必须把依赖包含进来，CMD 是在使用的时候再 require 对应的依赖
- 当前主流的库对 CMD 支持不是很友好，都需要额外的修改才能工作
- AMD 与 CMD 写法对比如下

```js
// CMD
// 代码写起来有同步require的感觉
define((require, exports, module) => {
  const $ = require('jquery‘)
  $('title').text('hello')
})
```

```js
// AMD
// 明显的异步风格
define(['jquery'], $ => {
  $('title').text('hello')
})
```

### seajs 中 require 书写约定

1. 正确拼写 require

```js
// 错误！
define(function(req) {
  // ...
}) // 正确！
define(function(require) {
  // ...
})
```

2. 使用直接量

```js
// 错误！
require(myModule) // 错误！
require('my-' + 'module') // 错误！
require('MY-MODULE'.toLowerCase()) // 正确！
require('my-module')
```

3. 不要修改 require

```js
// 错误 - 重命名 "require"！
var req = require,
  mod = req('./mod') // 错误 - 重定义 "require"!
require = function() {} // 错误 - 重定义 "require" 为函数参数！
function F(require) {} // 错误 - 在内嵌作用域内重定义了 "require"！
function F() {
  var require = function() {}
}
```

### seajs 隐藏坑

- 如下代码输出`$`为 null

```js
function func(require, exports, module) {
  const $ = require('jquery‘)
  console.log($)
}
func.toString = () => '() => {}'
define(func)
```

seajs 对于 require 和 define 函数的特殊要求是由于，seajs 原理导致的，seajs 的执行流程大致如下
![seajs执行流程](https://upload-images.jianshu.io/upload_images/6492782-21e0dd5a3aa6bd73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### seajs 使用示例

- 目录结构

```bash
.
├── index.html
└── js
    ├── lib
    │   ├── jquery.js
    │   ├── lodash.js
    │   └── sea.js
    ├── main.js
    └── time.js
```

- index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="“UTF-8”" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>seajs-demo</title>
  </head>
  <body>
    <h1 id="time"></h1>
    <script src="./js/lib/sea.js" data-main="./js/main.js"></script>
    <script>
       seajs.config({
         base: '/js/‘,
         alias: {
           jquery: './lib/jquery‘,
           lodash: './lib/lodash‘
         }
      })
      // 加载入口模块
      seajs.use('./js/main.js')
    </script>
  </body>
</html>
```

- main.js

```js
define((require, exports, module) => {
  const $ = require('jquery‘)
  const time = require('./time.js‘)
  $('#time').text('TIME: ' + time.getTime())
  setInterval(() => {
    $('#time').text('TIME: ' + time.getTime())
  }, 1000)
})
```

- time.js

```js
define((require, exports, module) => {
  module.exports = {
    getTime() {
      const $ = require('jquery‘)
      const _ = require('lodash‘)
      const time = new Date()
      const year = time.getFullYear()
      const month = _.padStart(time.getMonth() + 1, 2, '0‘)
      const date = _.padStart(time.getDate(), 2, '0‘)
      const hour = _.padStart(time.getHours(), 2, '0‘)
      const minute = _.padStart(time.getMinutes(), 2, '0‘)
      const second = _.padStart(time.getSeconds(), 2, '0‘)
      return `${year}/${month}/${date} ${hour}:${minute}:${second}`
    }
  }
})
```

## ES Modules

- ES Modules 是 ECMAScript modules 的简写，也可写为 ESM。 ES Modules 是 js 官方推出的标准
- ES Modules 相比于其他模块规范是一个静态化的模块解决方案，其他模块化方案都是运行时才能确定输出内容，而 ES Modules 是编译时就确定了的。其他模块化方案导入文件都是整个导入模块，而 ES Modules 可以只导入需要的部分
- ES Modules 会自动采用严格模式，不需要像 ES5 一样在头部加上”use strict”
- ES Modules 可运行在服务端（node）和浏览器。目前主流浏览器都已经支持 ES Modules，node 使用 ES Modules 需要在执行时加上--experimental-modules，且要求编写的 js 文件必须以.mjs 为后缀
- ES Modules 导出的是一个值得引用，即在模块内改变了导出值，那么下一次使用也会得到新的值
- 如下有两个文件，执行命令`node --experimental-modules index.mjs`，会有什么结果？

lib.mjs

```js
// lib.mjs
export let counter = 3

export function incCounter() {
  counter++
}
```

index.mjs

```js
// index.mjs
import * as mod from './lib’

// 此处输出值？console.log(mod.counter)
mod.incCounter()

// 此处输出值？
console.log(mod.counter)

```

### 循环引用

请问执行`node --experimental-modules main.mjs`后会输出什么内容
a.mjs

```js
// a.mjs
import { bar } from './b.mjs'
console.log('a.mjs')
console.log(bar)
export let foo = 'foo'
```

b.mjs

```js
// b.mjs
import { foo } from './a.mjs'
console.log('b.mjs')
console.log(foo)
export let bar = 'bar'
```

main.mjs

```js
// main.mjs
import './a.mjs'
```

## 循环依赖问题

- 在所有的模块规范中都存在循环依赖问题，解决依赖循环的方式都相似，几乎都采用惰性导入的方式来解决。
- 如下两个文件存在循环引用，当执行 node --experimental-modules a.mjs 时，会报错说 b 未定义，这就是由于循环依赖导致的，如果不使用 b 则不会报错，修改方案如下。其他的模块循环引用也可按照此方法进行修改。
- CommonJS 也可以使用先导出自身，再引入其他模块的方式尽心避免。同时也可以把 require 放入到函数体中，即在调用的时后才去加载依赖

![循环依赖](https://upload-images.jianshu.io/upload_images/6492782-22843b335e89a1b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 相关链接

- [AMD 和 CMD 的区别有哪些？- 玉伯的回答 - 知乎](https://www.zhihu.com/question/20351507/answer/14859415)
- https://github.com/seajs/seajs/issues/277
- https://github.com/seajs/seajs/issues/242
- PPT 中示例源码： [talk-is-cheap-show-me-the-code](https://github.com/nashaofu/talk-is-cheap-show-me-the-code/blob/master/webpack%E5%8E%9F%E7%90%86/%E4%BB%8E%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E8%AE%B2%E8%B5%B7/README.md)，源码示例不完善，仅供参考
- [PPT 录屏](https://www.bilibili.com/video/av61001656)
- [PDF 文档](./webpack原理-从前端模块化开始.pdf)

## 关于作者

- Github： https://github.com/nashaofu
- 简书： https://www.jianshu.com/u/2bdf94072c37
- 掘金： https://juejin.im/user/594130695c497d006bb7ba21

欢迎关注 nashaofu
