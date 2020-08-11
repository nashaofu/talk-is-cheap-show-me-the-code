class CircularQueue {
  constructor(size) {
    this.queue = new Array(size)
    this.size = size
    this.head = -1
    this.tail = -1
  }

  enQueue(value) {
    if (this.isFull()) {
      return false
    }
    if (this.isEmpty()) {
      this.head = 0
    }
    this.tail = (this.tail + 1) % this.size
    this.queue[this.tail] = value
    return true
  }

  deQueue() {
    if (this.isEmpty()) {
      return false
    }
    if (this.head === this.tail) {
      this.head = -1
      this.tail = -1
      return true
    }

    this.head = (this.head + 1) % this.size
    return true
  }

  Front() {
    return this.isEmpty() ? -1 : this.queue[this.head]
  }

  Rear() {
    return this.isEmpty() ? -1 : this.queue[this.tail]
  }
  isEmpty() {
    return this.head === -1
  }
  isFull() {
    return (this.tail + 1) % this.size === this.head
  }
}

const circularQueue = new CircularQueue(4) // 设置长度为 4
console.log(circularQueue.enQueue(3)) // 返回 true
console.log(circularQueue.Front()) // 返回 3
console.log(circularQueue.isFull()) // 返回 false
console.log(circularQueue.enQueue(7)) // 返回 true
console.log(circularQueue.enQueue(2)) // 返回 true
console.log(circularQueue.enQueue(5)) // 返回 true
console.log(circularQueue.deQueue()) // 返回 true
console.log(circularQueue.enQueue(4)) // 返回 true
console.log(circularQueue)
console.log(circularQueue.enQueue(2)) // 返回 false
console.log(circularQueue.isEmpty()) // 返回 false
console.log(circularQueue.Rear()) // 返回 4
