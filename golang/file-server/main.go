package main

import (
	"fmt"
	"net/http"

	pinyin "github.com/mozillazg/go-pinyin"
)

func main() {
	fmt.Println("hello")

	hans := "中国人"

	// 默认
	a := pinyin.NewArgs()
	fmt.Println(pinyin.Pinyin(hans, a))
	http.ListenAndServe(":8080", http.FileServer(http.Dir("./")))
}
