// 插入排序
// 从小到大
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      const temp = arr[j]
      arr[j] = arr[j - 1]
      arr[j - 1] = temp
    }
    console.log(arr)
  }
  return arr
}

const arr = [6, 3, 5, 2, 4, 1]

insertionSort(arr)

console.log(arr)
