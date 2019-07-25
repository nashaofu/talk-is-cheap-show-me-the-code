# require 与 import 循环应用问题

## 注意

nodejs 使用 import 语法必须把 js 文件命名为`*.mjs`

## 运行

```bash
# commonjs
node main.js
# es module
node --experimental-modules a.mjs
```

# 目录说明

- `commonjs`: 循环依赖示例
- `esmodules`: 循环依赖示例
- `esmodules2`: 循环依赖解决方案示例
