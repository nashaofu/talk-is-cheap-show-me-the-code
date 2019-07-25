define(['require', 'b'], function(require) {
  console.log('我是a', arguments)
  return {
    doSomething() {
      const b = require('b')
      console.log('a 中输出b', b)
    }
  }
})
