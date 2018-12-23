# talk-is-cheap-show-me-the-code
专治各种疑难杂症的仓库

```bash
.
├── LICENSE
├── README.md
├── clone # js clone
│   ├── deep.js
│   ├── index.html
│   └── js.js
├── currying.js # 函数柯里化
├── CCpp # C/C++练习
├── cycles # 循环引用研究
│   ├── commonjs
│   │   ├── a.js
│   │   ├── b.js
│   │   └── main.js
│   ├── esmodules
│   │   ├── a.mjs
│   │   ├── b.mjs
│   │   └── main.mjs
│   └── esmodules2
│       ├── a.mjs
│       ├── b.mjs
│       └── main.mjs
├── package.json
├── promise
│   ├── P.js # 创建P类，继承于Promise，但添加了静态方法
│   ├── parallelResolveOnce.js # 并行Promise，其中又一个成功则整个任务完成并切整个任务成功
│   ├── resolveOnce.js  # 串行并行Promise成功一次的演示
│   └── serialResolveOnce.js  # 串行Promise，直到又一个成功就结束整个进程，并切整个任务成功
├── thunkify # thunk函数使用
│   ├── co.js
│   ├── console.js
│   ├── readFile.js
│   └── thunkify.js
├── utf8.ts # uft8字符与16进制数组互相转换
└── 内存泄漏.html # 内存泄漏研究
```
