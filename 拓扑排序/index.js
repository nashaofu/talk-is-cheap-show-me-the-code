const cdns = require('./cdns')

// 生成新对象，方便排序
const bundles = cdns.map(cdn => ({
  ...cdn,
  deps: new Set(cdn.dependencies)
}))

/**
 * 拓扑排序（卡恩算法）
 * 把未排序的和已排序的分别放入两个数组
 * 遇到没有依赖的项目，push到已排序数组
 * 删掉未排序集合中这一个项目的依赖
 * 不断循环，直到未排序数组长度为0
 * 如果中途存在未排序的数组长度等于传进来的集合长度
 * 说明存在循环依赖，不能排序
 * 参考：https://zh.wikipedia.org/wiki/%E6%8B%93%E6%92%B2%E6%8E%92%E5%BA%8F
 * @param {Array} bundles
 */
function topologicalSort(bundles) {
  const sorted = []
  const unsorted = []

  bundles.forEach(bundle => {
    if (bundle.deps && !bundle.deps.size) {
      sorted.push(bundle)
      bundles.forEach(({ deps }) => deps.delete(bundle.name))
    } else {
      unsorted.push(bundle)
    }
  })

  if (bundles.length && bundles.length === unsorted.length) throw new Error('存在循环依赖，cdn不能排序')
  if (unsorted.length) sorted.push(...topologicalSort(unsorted))
  return sorted
}

console.log(topologicalSort(bundles).map(({ name }) => name))
