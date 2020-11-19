// 递归实现clone
function clone(obj) {
  let map = new Map()

  function c(obj) {
    if (typeof obj !== 'object') {
      return obj
    }

    let data = {}
    map.set(obj, data)
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        let clonedData = map.get(obj[key])
        if (clonedData) {
          data[key] = clonedData
        } else {
          data[key] = c(obj[key])
        }
      } else {
        data[key] = obj[key]
      }
    }

    return data
  }

  return c(obj)
}
