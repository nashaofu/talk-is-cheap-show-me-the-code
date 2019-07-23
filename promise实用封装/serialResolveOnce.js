/**
 * 串行执行一批任务
 * 如果又一次成功就结束整个进程
 * 并返回执行成功的结果
 * @param {*} items
 * @param {*} handle
 * @param {*} length
 */
module.exports = (items, handle, length = 1) => {
  return new Promise((resolve, reject) => {
    let i = 0
    async function next() {
      const slice = items.slice(i, i + length)
      i += length
      // 如果数据执行完之后还没有成功就认定失败
      if (!slice.length) return reject(new Error('ALL_REJECTED'))
      try {
        // 执行处理逻辑
        resolve(await handle(slice))
      } catch (e) {
        // 循环下一个切片
        await next()
      }
    }
    next()
  })
}
