/**
 * 伪代码
 * function quicksort(q)
 * {
 *     var list less, pivotList, greater
 *     if length(q) ≤ 1
 *         return q
 *     else
 *     {
 *         select a pivot value pivot from q
 *         for each x in q except the pivot element
 *         {
 *             if x < pivot then add x to less
 *             if x ≥ pivot then add x to greater
 *         }
 *         add pivot to pivotList
 *         return concatenate(quicksort(less), pivotList, quicksort(greater))
 *     }
 * }
 */

function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let left = []
  let right = []
  let pivot = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

let arr = [6, 3, 5, 2, 4, 1]

arr = quickSort(arr)

console.log(arr)
