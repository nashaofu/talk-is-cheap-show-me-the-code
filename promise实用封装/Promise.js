/**
 * 目前未完全实现Promise A+规范
 * 主要讲解原理，所以测试会有很多报错
 */
class Promise {
  constructor(fn) {
    this.status = 'pending'
    this.value = undefined

    this._fulfilled = []
    this._rejected = []

    const resovle = val => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = val
        while (this._fulfilled.length) {
          this._fulfilled.shift()()
        }
      }
    }
    const rejct = err => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = err
        while (this._rejected.length) {
          this._rejected.shift()()
        }
      }
    }
    fn(resovle, rejct)
    return this
  }

  then(fn1, fn2) {
    return new Promise((resolve, reject) => {
      const ifn1 = () => {
        try {
          resolve(typeof fn1 === 'function' ? fn1(this.value) : this.value)
        } catch (e) {
          reject(e)
        }
      }
      const ifn2 = () => {
        try {
          if (typeof fn2 === 'function') {
            resolve(fn2(this.value))
          } else {
            reject(this.value)
          }
        } catch (e) {
          reject(e)
        }
      }

      setTimeout(() => {
        if (this.status === 'resolved') {
          ifn1()
        } else if (this.status === 'rejected') {
          ifn2()
        } else {
          this._fulfilled.push(ifn1)
          this._rejected.push(ifn2)
        }
      }, 0)
    })
  }

  catch(fn) {
    return this.then(null, fn)
  }

  finally(fn) {
    this.then(
      () => fn(),
      err => {
        fn()
        throw err
      }
    )
  }
}

// 用于跑Promise的测试(promises-aplus-tests)用例
Promise.deferred = function () {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

module.exports = Promise
