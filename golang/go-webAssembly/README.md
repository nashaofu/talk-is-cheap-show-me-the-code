# go-webAssembly

# 运行

```bash
GOOS=js GOARCH=wasm go build -o main.wasm

# install goexec: go get -u github.com/shurcooL/goexec
goexec 'http.ListenAndServe(`:8080`, http.FileServer(http.Dir(`.`)))'
```
