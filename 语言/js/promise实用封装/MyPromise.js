class MyPromise {
  status = 'pending'
  value = undefined
  _fulfilled = []
  _rejected = []

  constructor(fn) {
    const resolve = val => {
      setTimeout(() => {
        if (this.status !== 'pending') {
          return
        }
        if (val instanceof MyPromise) {
          // 如果 value 是个 Promise，递归执行
          return val.then(resolve, reject)
        }
        this.value = val
        this.status = 'fulfilled'
        while (this._fulfilled.length) {
          this._fulfilled.shift()()
        }
      })
    }
    const reject = err => {
      setTimeout(() => {
        if (this.status !== 'pending') {
          return
        }
        this.value = err
        this.status = 'rejected'
        while (this._rejected.length) {
          this._rejected.shift()()
        }
      })
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    let self = this
    let p = new MyPromise((resolve, reject) => {
      if (typeof onFulfilled !== 'function') {
        onFulfilled = val => val
      }
      if (typeof onRejected !== 'function') {
        onRejected = err => {
          throw err
        }
      }

      const fulfilledFn = function () {
        try {
          let r = onFulfilled(self.value)
          resolveValue(r, p, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }
      const rejectedFn = function () {
        try {
          let r = onRejected(self.value)
          resolveValue(r, p, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }
      if (this.status === 'pending') {
        this._fulfilled.push(fulfilledFn)
        this._rejected.push(rejectedFn)
      } else if (this.status === 'fulfilled') {
        setTimeout(() => {
          fulfilledFn()
        })
      } else {
        setTimeout(() => {
          rejectedFn()
        })
      }
    })
    return p
  }
  catch(fn) {
    return this.then(null, fn)
  }
}

function resolveValue(result, currentPromise, resolve, reject) {
  if (result === currentPromise) {
    return reject(new TypeError('Error'))
  }

  if (result instanceof MyPromise) {
    result.then(value => {
      resolveValue(value, currentPromise, resolve, reject)
    }, reject)
    return
  }

  let called = false
  if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
    try {
      let then = result.then
      if (typeof then === 'function') {
        then.call(
          result,
          y => {
            if (called) return
            called = true
            resolveValue(y, currentPromise, resolve, reject)
          },
          e => {
            if (called) return
            called = true
            reject(e)
          }
        )
      } else {
        resolve(result)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(result)
  }
}

// const a = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2)
//     reject(1)
//   }, 1000)
// })

// a.then(
//   val => {
//     console.log(val, 'sadasd')
//     return a
//   },
//   err => {
//     console.log(err, 'err')
//     throw err + 'sdasdas'
//   }
// )
//   // .then(val => {
//   //   console.log('then', val)
//   // })
//   .catch(err => {
//     console.log('catch')
//   })

// 用于跑Promise的测试(promises-aplus-tests)用例
MyPromise.deferred = function () {
  const deferred = {}
  deferred.promise = new MyPromise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

module.exports = MyPromise
