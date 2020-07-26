const Observer = require('./observer')

module.exports = class Watcher {
  static target = null
  constructor(obj, key, callback) {
    this.key = key
    this.callback = callback
    Watcher.target = this
    this.val = obj[key]
    Watcher.target = null
  }
}
