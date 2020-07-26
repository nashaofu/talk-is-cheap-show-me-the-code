const Observer = require('./observer')
const Watcher = require('./watcher')

const a = {
  a: 1
}

new Observer(a)

new Watcher(a, 'a', (oldVal, val) => {
  console.log(oldVal, val)
})

a.a = '2'
a.a = '3'
a.a = 'a'
