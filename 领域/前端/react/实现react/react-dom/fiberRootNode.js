export default class FiberRootNode {
  constructor(containerInfo) {
    // 以下每个属性的意义可以查看 BaseFiberRootProperties
    // 在那里我把一些属性都注释了一遍中文
    this.current = null
    this.containerInfo = containerInfo
    this.pendingChildren = null
    this.pingCache = null
    this.pendingCommitExpirationTime = 0
    this.finishedWork = null
    this.timeoutHandle = null
    this.context = null
    this.pendingContext = null
    this.firstBatch = null

    // if (enableNewScheduler) {
    //   this.callbackNode = null
    //   this.callbackExpirationTime = NoWork
    //   this.firstPendingTime = NoWork
    //   this.lastPendingTime = NoWork
    //   this.pingTime = NoWork
    // } else {
    //   this.earliestPendingTime = NoWork
    //   this.latestPendingTime = NoWork
    //   this.earliestSuspendedTime = NoWork
    //   this.latestSuspendedTime = NoWork
    //   this.latestPingedTime = NoWork
    //   this.didError = false
    //   this.nextExpirationTimeToWorkOn = NoWork
    //   this.expirationTime = NoWork
    //   this.nextScheduledRoot = null
    // }

    // if (enableSchedulerTracing) {
    //   this.interactionThreadID = unstable_getThreadID()
    //   this.memoizedInteractions = new Set()
    //   this.pendingInteractionMap = new Map()
    // }
  }
}
