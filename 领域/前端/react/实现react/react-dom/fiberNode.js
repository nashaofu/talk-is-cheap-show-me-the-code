export default function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  // 对于 FiberNode 中的属性，我们当下只需要以下几点
  // stateNode 保存了每个节点的 DOM 信息
  // return、child、sibling、index 组成了单链表树结构
  // return 代表父 fiber，child 代表子 fiber、sibling 代表下一个兄弟节点，和链表中的 next 一个含义
  // index 代表了当前 fiber 的索引
  // 另外还有一个 alternate 属性很重要，这个属性代表了一个更新中的 fiber，这部分的内容后面会涉及到
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // Fiber
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.contextDependencies = null

  this.mode = mode

  // Effects
  this.effectTag = null
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  this.expirationTime = 0
  this.childExpirationTime = 0

  this.alternate = null
}
