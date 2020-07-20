// 原地分区，减少内存占用
function quickSort(arr) {
  partition(arr, 0, arr.length - 1)
  return arr
}

function partition(arr, lIndex, rIndex) {
  if (lIndex < rIndex) {
    // 分区操作
    const pivot = lIndex // 设定基准值（pivot）
    const pivotValue = arr[pivot]
    let index = pivot + 1
    for (let i = index; i <= rIndex; i++) {
      // 小于 pivotValue 的全部放到前面的小于pivotValue的分区
      if (pivotValue > arr[i]) {
        swap(arr, i, index)
        index++
      }
    }
    // 把 pivotValue 放到分区中间
    const partitionIndex = index - 1
    swap(arr, pivot, partitionIndex)
    // 此时，数组arr被分为了小于pivotValue，pivotValue，大于pivotValue的三个区域
    console.log('current arr', arr)
    partition(arr, lIndex, partitionIndex - 1)
    partition(arr, partitionIndex + 1, rIndex)
  }
  return arr
}

function swap(arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

let arr = [3, 4, 2, 6, 5, 1]
console.log(arr)
arr = quickSort(arr)

console.log(arr)
