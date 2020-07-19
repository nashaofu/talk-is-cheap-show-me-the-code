/**
 * 并行执行一批任务
 * 有一个成功就认为整个任务成功
 * @param {*} items
 * @param {*} handle
 */
module.exports = (items, handle) => {
  return new Promise((resolve, reject) => {
    const tasks = items.map(item => {
      // 当前任务状态
      const task = {
        status: 'pending',
        value: undefined
      }

      handle(item)
        .then(val => {
          task.status = 'resolved'
          task.value = val
          resolve(task.value)
        })
        .catch(err => {
          task.status = 'rejected'
          task.value = err
          let isHasPendingTask = false

          // 检测是否已经
          for (let i = 0, length = tasks.length; i < length; i++) {
            if (tasks[i].status === 'resolved') return
            if (tasks[i].status === 'pending') {
              isHasPendingTask = true
              break
            }
          }

          // 所有都失败则，任务失败
          if (!isHasPendingTask) reject(new Error('ALL_REJECTED'))
        })
      return task
    })
  })
}
