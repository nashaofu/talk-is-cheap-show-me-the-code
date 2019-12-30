# CMake 最低版本号要求
cmake_minimum_required(VERSION 3.10)

# 项目名称
project (cppenv)

# 查找当前目录下的所有源文件
# 并将名称保存到 DIR_SRCS 变量
aux_source_directory(. DIR_SRCS)

add_executable(cppenv ${DIR_SRCS})

# GDB支持
set(CMAKE_BUILD_TYPE "Debug")
set(CMAKE_CXX_FLAGS_DEBUG "$ENV{CXXFLAGS} -O0 -Wall -g -ggdb")
set(CMAKE_CXX_FLAGS_RELEASE "$ENV{CXXFLAGS} -O3 -Wall")


# 构建一个 CPack 安装包
include (InstallRequiredSystemLibraries)
# set (CPACK_RESOURCE_FILE_LICENSE "${CMAKE_CURRENT_SOURCE_DIR}/LICENSE")
set (CPACK_PACKAGE_VERSION_MAJOR "${cppenv_VERSION_MAJOR}")
set (CPACK_PACKAGE_VERSION_MINOR "${cppenv_VERSION_MINOR}")
include (CPack)
