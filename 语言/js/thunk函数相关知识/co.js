const co = require('co')
const fs = require('fs')
const path = require('path')
const thunkify = require('./thunkify')
const readFileThunk = thunkify(fs.readFile)

var g = function*() {
  const r1 = yield readFileThunk(
    path.join(__dirname, '../cycles/commonjs/a.js'),
    'utf8'
  )
  console.log(r1.toString())
  const r2 = yield readFileThunk(
    path.join(__dirname, '../cycles/commonjs/b.js')
  )
  console.log(r2.toString())
  return 'log'
}

co(g)
  .then((...val) => {
    console.log(val)
  })
  .catch(err => {
    console.log('err:', err)
  })
