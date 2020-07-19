# C++开发环境搭建

## Windows

1. 下载[cmake](https://cmake.org/)，安装时把 cmake 添加到 PATH
2. 安装 MSBuild 或者 Visual Studio，然后把 MSBuild 添加到 PATH，使得在终端中可以访问
3. 安装[NSIS](https://nsis.sourceforge.io/Main_Page)
4. 在目录下运行

```bash
# 生成解决方案
cmake . -B out

cd out

# 编译源码
MSBuild ./cppenv.sln

# 生成安装文件
cpack -C CPackConfig.cmake
```

## Mac 或 linux

1. 安装 cmake
2. 安装 make，通常 mac 和 linux 下都自带 make 命令，不需要额外安装
3. 在目录下运行

```bash
# 生成解决方案
cmake . -B out

cd out

# 编译源码
make

# 生成安装文件
cpack -C CPackConfig.cmake
```
