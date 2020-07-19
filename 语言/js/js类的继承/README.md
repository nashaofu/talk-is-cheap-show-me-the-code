# JS 类的继承实现

## 说明

es6.js 是 es6 代码的写法，es6Toes5.js 是由 babel 转换后的代码修改

## 结论

es6 语法

```js
class A {
  constructor() {
    this.myA = 'a'
  }
  a() {
    console.log('A-a')
  }
}

class B extends A {
  constructor() {
    super()
    this.myB = 'b'
  }
  b() {
    console.log('B-b')
  }
}

const b = new B()
```

转换为 es5 之后的代码

```js
function A() {
  this.myA = 'a'
}

A.prototype.a = function() {
  console.log('A-a')
}

function B() {
  const _this = B.__proto__.apply(this, arguments) || this
  _this.myB = 'b'
  return _this
}

B.prototype.b = function() {
  console.log('B-b')
}
B.prototype.__proto__ = A.prototype
B.__proto__ = A

// 实例化 B 类，如下代码是new B()的实现
let b = {}
// 先执行原型赋值，保证 b instanceof B 成立
b.__proto__ = B.prototype
b = B.call(b)
```

instanceof 与 isPrototypeOf 的区别

```js
b instanceof B // b.__proto__ === B.prototype 一直查找__proto__是否为B.prototype
B.isPrototypeOf(b) // b.__proto__ === B 一直查找 __proto__ 上的值是否为B

B.prototype.isPrototypeOf(b) // 相当于 b instanceof B
```
