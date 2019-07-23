# promise 实用封装

```bash
.
├── P.js # 创建P类，继承于Promise，但添加了静态方法
├── parallelResolveOnce.js # 并行Promise，其中又一个成功则整个任务完成并切整个任务成功
├── resolveOnce.js  # parallelResolveOnce与serialResolveOnce执行示例
└── serialResolveOnce.js  # 串行Promise，直到又一个成功就结束整个进程，并切整个任务成功
```

## [parallel-to-serial](https://github.com/nashaofu/parallel-to-serial)

串行执行 Promise 任务
