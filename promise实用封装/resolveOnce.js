const serialResolveOnce = require('./serialResolveOnce')
const parallelResolveOnce = require('./parallelResolveOnce')

// 示例函数
const run = items => {
  let si = 0
  return serialResolveOnce(items, ([item]) => {
    console.log(`串行小任务${si}：`, item)
    console.log('   开始并行执行：', item)
    let pi = 0
    const p = parallelResolveOnce(item, val => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          pi++
          const isDone = pi === item.length
          console.log(`       并行执行${pi}：`, item, '->', val)
          if (val % 3 === 0) {
            resolve({ item, val })
          } else {
            reject()
          }
          if (isDone) console.log('   结束并行执行：', item, '->', val)
        }, 1000)
      })
    })
    p.then(val => {
      console.log('串行小任务执行成功：', item, '->', val, '\n')
    }).catch(err => {
      console.log('串行小任务执行失败：', item, '->', err.message, '\n')
    })
    return p
  })
    .then(val => {
      console.log('整个任务执行成功', val)
    })
    .catch(err => {
      console.log('整个任务执行失败:', err.message)
    })
}

/**
 * 串行执行数组的一维，有一个成功就认为整体成功
 * 数组的二维为并行执行，二维中的有一项%3===0就认为成功并行成功
 */
const items1 = [[1, 2, 2, 4], [1, 1, 1, 1], [1, 2, 5, 4]]
const items2 = [[1, 2, 2, 4], [1, 1, 3, 1], [1, 2, 5, 4]]

console.log('\n*************************运行任务1*************************：')
console.log('输入：', items1, '\n')
run(items1).finally(() => {
  console.log('\n\n*************************运行任务2*************************：')
  console.log('输入：', items2, '\n')
  run(items2)
})
