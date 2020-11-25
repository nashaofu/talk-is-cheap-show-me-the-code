// 从小大大排序
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    console.log(arr)
    for (let j = i; j < arr.length; j++) {
      // 记住最小的数的位置
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    // 把最小数移动到目标位置
    const temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
}

const arr = [6, 3, 5, 2, 4, 1]

selectionSort(arr)
console.log(arr)
