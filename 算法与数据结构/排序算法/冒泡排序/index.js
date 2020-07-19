// 从小到大排序
// 每一轮排序结束，大值就排到末尾，大值逐渐往后冒泡
function bubbleSort(arr) {
  // 排序次数为length - 1次
  // 每一轮结束，最大值就冒泡到末尾了
  for (let i = 0; i < arr.length - 1; i++) {
    // 后面的i个元素已经是按顺序排列好的了，不需要在排
    // arr.length - i - 1 保证j + 1存在
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 前一个比后一个大，交换位置
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    console.log(arr)
  }
  return arr
}

const arr = [6, 3, 5, 2, 4, 1]

bubbleSort(arr)

console.log(arr)
