# go-webAssembly

# 运行

```bash
GOOS=js GOARCH=wasm go build -o main.wasm

# install goexec: go get -u github.com/shurcooL/goexec
goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
```

直接使用go编译，编译出的文件体积较大，所以可以用tinygo编译，如下代码演示了用docker编译webAssembly

```bash
# 使用tinygo编译
# 请确保在README.md同级目录下执行该命令
docker run --rm -v $(pwd):/src/go-webAssembly tinygo/tinygo tinygo build -o /src/go-webAssembly/wasm.wasm -target=wasm /src/go-webAssembly/main.go
```
