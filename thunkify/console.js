const thunkify = require('./thunkify')

const log = thunkify(console.log)

const b = log('1', 3)('2')
console.log(b)

// 只会打印一次sum的值
function f(a, b, callback) {
  var sum = a + b
  callback(sum)
  callback(sum)
}

var ft = thunkify(f)
var print = console.log.bind(console)
ft(1, 2)(print)
