// 插入排序
// 从小到大
// 循环次数为(n-1)+(n-2)+(n-3)+...+(n-(n-1)) => n(n-2)所以复杂度为O(n^2)
function insertionSort(arr) {
  // 排序轮数为 length - 1 次
  // 选择一个数，然后和前面已经排好序的进行比较
  for (let i = 1; i < arr.length; i++) {
    // 当前值比前面的已排序的最后一个元素小，说明需要排序，否则就不用排序了
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
