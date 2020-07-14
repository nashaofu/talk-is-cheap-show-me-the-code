/**
 * 实现Promise.all
 * 参数未验证，主要实现原理
 */
Promise.all = function (promiseArray) {
  return new Promise((resolve, reject) => {
    let i = 0
    const result = []
    promiseArray.forEach((p, index) => {
      p.then(
        val => {
          i++
          result[index] = val
          if (i === promiseArray.length) {
            resolve(result)
          }
        },
        err => reject(err)
      )
    })
  })
}

/**
 * 实现Promise.race
 * 参数未验证，主要实现原理
 */
Promise.race = function (promiseArray) {
  return new Promise((resolve, reject) => {
    let i = 0
    promiseArray.forEach((p, index) => {
      p.then(
        val => resolve(val),
        err => reject(err)
      )
    })
  })
}

/**
 * 实现Promise.allSettled
 * 参数未验证，主要实现原理
 */
Promise.allSettled = function (promiseArray) {
  return new Promise((resolve, reject) => {
    let i = 0
    const result = []
    promiseArray.forEach((p, index) => {
      p.then(
        val => {
          i++
          result[index] = {
            status: 'fulfilled',
            value: val
          }
          if (i === promiseArray.length) {
            resolve(result)
          }
        },
        err => {
          i++
          result[index] = {
            status: 'rejected',
            value: err
          }
          if (i === promiseArray.length) {
            resolve(result)
          }
        }
      )
    })
  })
}
