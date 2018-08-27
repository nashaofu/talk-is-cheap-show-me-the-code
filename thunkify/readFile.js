const fs = require('fs')
const path = require('path')
const thunkify = require('./thunkify')
const readFileThunk = thunkify(fs.readFile)

const gen = function*() {
  const r1 = yield readFileThunk(
    path.join(__dirname, '../cycles/commonjs/a.js')
  )
  console.log(r1.toString())
  const r2 = yield readFileThunk(
    path.join(__dirname, '../cycles/commonjs/b.js')
  )
  console.log(r2.toString())
}
/**
 * 1. 手动执行
 */
const g = gen()
const r1 = g.next()
r1.value(function(err, data) {
  if (err) throw err
  const r2 = g.next(data)
  r2.value(function(err, data) {
    if (err) throw err
    g.next(data)
  })
})


/**
 * 2. 自动流程控制
 */
const g2 = gen()
function next(err, data) {
  if (err) throw err
  const r1 = g2.next(data)
  if (r1.value) r1.value(next)
}
next()
