// 堆的每个节点的左边子节点索引是 i * 2 + 1，右边是 i * 2 + 2，父节点是 (i - 1) /2。i 为当前节点在head中的索引
class MinHeap {
  constructor() {
    this.heap = []
  }

  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }

  // 删除最小元素
  deleteMin() {
    return this.delete(0)
  }
  // 删除任意元素
  delete(i) {
    // 交换首位元素
    const lastIndex = this.heap.length - 1
    if (lastIndex < i) return
    const r = this.heap[i]
    this.heap[i] = this.heap[lastIndex]
    this.heap[lastIndex] = r
    this.heap.splice(lastIndex, 1)
    this.shiftDown(i)
    this.shiftUp(i)
    return r
  }

  /**
   * 子节点和父节点交换，从子级遍历到父级
   * @param {*} i
   */
  shiftUp(i) {
    // 获取父级的下标
    let parentIndex = parseInt((i - 1) / 2)

    // 最大堆和最小堆，通过这里的比较运算符设置
    while (this.heap[i] < this.heap[parentIndex]) {
      const temp = this.heap[i]
      this.heap[i] = this.heap[parentIndex]
      this.heap[parentIndex] = temp
      i = parentIndex
      parentIndex = parseInt((i - 1) / 2)
    }
  }

  /**
   * 把最小值放到最顶端
   * 父节点和子节点交换，从父级遍历到子级
   * @param {*} i
   */
  shiftDown(i) {
    const size = this.heap.length - 1
    while (true) {
      let lChildIndex = i * 2 + 1
      let rChildIndex = i * 2 + 2
      const isSwapLeft = lChildIndex <= size  && this.heap[i] > this.heap[lChildIndex]
      const isSwapRight = rChildIndex <= size  && this.heap[i] > this.heap[rChildIndex]

      if (isSwapLeft) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[lChildIndex]
        this.heap[lChildIndex] = temp
        i = lChildIndex
        continue
      } else if (isSwapRight) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[rChildIndex]
        this.heap[rChildIndex] = temp
        i = rChildIndex
      }
      break
    }
  }
}

const h = new MinHeap()

h.insert(1)
h.insert(4)
h.insert(2)
h.insert(5)
h.insert(6)
h.insert(7)
h.insert(3)
// h.insert(81)
console.log(h.heap)
h.delete(3)
console.log(h.heap)
