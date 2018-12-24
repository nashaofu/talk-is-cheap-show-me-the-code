# CMake 最低版本号要求
cmake_minimum_required(VERSION 3.10)

# 项目名称
project (cmakedemo)

# 查找当前目录下的所有源文件
# 并将名称保存到 DIR_SRCS 变量
aux_source_directory(. DIR_SRCS)

# 添加 math 子目录
add_subdirectory(math)

add_executable(cmakedemo ${DIR_SRCS})

# 添加链接库
target_link_libraries(cmakedemo Math)
