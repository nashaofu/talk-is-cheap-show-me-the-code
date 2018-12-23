/**
 * 创建制定深度和广度的对象
 * @param {*} deep
 * @param {*} breadth
 */
function createData(deep, breadth) {
  var data = {}
  var temp = data

  for (var i = 0; i < deep; i++) {
    temp = temp['data'] = {}
    for (var j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return data
}

/**
 * 简单的浅拷贝
 * @param {*} source
 */
function shallowClone(source) {
  var target = {}
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i]
    }
  }

  return target
}

/**
 * 简单深拷贝
 * @param {*} source
 */
function clone(source) {
  var target = {}
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        target[i] = clone(source[i]) // 注意这里
      } else {
        target[i] = source[i]
      }
    }
  }

  return target
}
