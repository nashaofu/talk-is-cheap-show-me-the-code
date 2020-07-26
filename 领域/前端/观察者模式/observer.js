const Watcher = require('./watcher')

module.exports = class Observer {
  constructor(obj) {
    this.deps = {}
    this.def(obj)
  }

  def(obj) {
    Object.keys(obj).forEach(key => {
      this.deps[key] = []
      let oldVal = obj[key]

      Object.defineProperty(obj, key, {
        get: () => {
          const target = Watcher.target
          if (target && target.key === key) {
            this.deps[key].push(target)
          }
          return oldVal
        },
        set: val => {
          const v = oldVal
          oldVal = val
          this.notify(key, v, val)
        }
      })
    })
  }

  notify(key, oldVal, val) {
    this.deps[key].forEach(watcher => watcher.callback(oldVal, val))
  }
}
