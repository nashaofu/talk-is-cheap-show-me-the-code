import FiberNode from './fiberNode.js'
import FiberRootNode from './fiberRootNode.js'

export default class ReactRoot {
  constructor(container, isConcurrent) {
    const root = new FiberRootNode(container)
    const uninitializedFiber = new FiberNode(3, null, null, 0b000)
    root.current = uninitializedFiber
    uninitializedFiber.stateNode = root
    this._internalRoot = root
  }

  render(children) {
    // 这里指 FiberRoot
    const root = this._internalRoot
    updateContainer(children, root, null)
  }

  unmount() {
    updateContainer(null, root, null)
  }

  createBatch() {}
}

function updateContainer(element, container, parentComponent) {
  const current = container.current
  const currentTime = performance.now()
  // expirationTime 代表优先级，数字越大优先级越高
  // sync 的数字是最大的，所以优先级也是最高的
  // const expirationTime = computeExpirationForFiber(currentTime, current)
  const expirationTime = 10
  return scheduleRootUpdate(current, element, expirationTime)
}

function scheduleRootUpdate(current, element, expirationTime) {
  // 创建一个 update，就是内部有几个属性的对象
  const update = {
    expirationTime: expirationTime,

    tag: 0,
    // setState 的第一二个参数
    payload: { element },
    callback: null,
    // 用于在队列中找到下一个节点
    next: null,
    nextEffect: null
  }
  // Caution: React DevTools currently depends on this property
  // being called "element".
  enqueueUpdate(current, update)
}

function enqueueUpdate(fiber, update) {
  // Update queues are created lazily.
  // 获取 fiber 的镜像
  const alternate = fiber.alternate
  let queue1
  let queue2
  // 第一次 render 的时候肯定是没有这个镜像的，所以进第一个条件
  if (alternate === null) {
    // There's only one fiber.
    // 一开始也没这个 queue，所以需要创建一次
    queue1 = fiber.updateQueue
    queue2 = null
    if (queue1 === null) {
      // UpdateQueue 是一个链表组成的队列
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
    }
  } else {
    // There are two owners.
    queue1 = fiber.updateQueue
    queue2 = alternate.updateQueue
    // 以下就是在判断 q1、q2 存不存在了，不存在的话就赋值一遍
    // clone 的意义也是为了节省开销
    if (queue1 === null) {
      if (queue2 === null) {
        // Neither fiber has an update queue. Create new ones.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState)
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)
      } else {
        // Only one fiber has an update queue. Clone to create a new one.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2)
      }
    } else {
      if (queue2 === null) {
        // Only one fiber has an update queue. Clone to create a new one.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1)
      } else {
        // Both owners have an update queue.
      }
    }
  }
  // 获取队列操作完毕以后，就开始入队了
  // 以下的代码很简单，熟悉链表的应该清楚链表添加一个节点的逻辑
  if (queue2 === null || queue1 === queue2) {
    // There's only a single queue.
    appendUpdateToQueue(queue1, update)
  } else {
    // There are two queues. We need to append the update to both queues,
    // while accounting for the persistent structure of the list — we don't
    // want the same update to be added multiple times.
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update)
      appendUpdateToQueue(queue2, update)
    } else {
      // Both queues are non-empty. The last update is the same in both lists,
      // because of structural sharing. So, only append to one of the lists.
      appendUpdateToQueue(queue1, update)
      // But we still need to update the `lastUpdate` pointer of queue2.
      queue2.lastUpdate = update
    }
  }
}

function createUpdateQueue(baseState) {
  const queue = {
    baseState,
    // 链表头
    firstUpdate: null,
    // 链表尾
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

function cloneUpdateQueue(currentQueue) {
  const queue = {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,

    // TODO: With resuming, if we bail out and resuse the child tree, we should
    // keep these effects.
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,

    firstEffect: null,
    lastEffect: null,

    firstCapturedEffect: null,
    lastCapturedEffect: null
  }
  return queue
}

function appendUpdateToQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update
  } else {
    queue.lastUpdate.next = update
    queue.lastUpdate = update
  }
}
