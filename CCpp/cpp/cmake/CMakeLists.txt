# CMake 最低版本号要求
cmake_minimum_required(VERSION 3.10)

# 项目名称
project (cmakedemo)

# 加入一个配置头文件，用于处理 CMake 对源码的设置
configure_file (
  "${PROJECT_SOURCE_DIR}/config.h.in"
  "${PROJECT_BINARY_DIR}/config.h"
)

# 查找当前目录下的所有源文件
# 并将名称保存到 DIR_SRCS 变量
aux_source_directory(. DIR_SRCS)

# 添加 math 子目录
add_subdirectory(math)

add_executable(cmakedemo ${DIR_SRCS})

# 定义
option (CMAKE_OPTION "Use provided math implementation" ON)

# 添加链接库
target_link_libraries(cmakedemo Math)

# GDB支持
set(CMAKE_BUILD_TYPE "Debug")
set(CMAKE_CXX_FLAGS_DEBUG "$ENV{CXXFLAGS} -O0 -Wall -g -ggdb")
set(CMAKE_CXX_FLAGS_RELEASE "$ENV{CXXFLAGS} -O3 -Wall")
