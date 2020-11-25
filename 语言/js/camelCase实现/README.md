# camelCase实现

使用replace简单实现camelCase

```js
function camelCase(str) {
  return str.replace(/[^a-z]+([a-z])/ig, (match, $1) => {
    return $1.toUpperCase()
  })
}
```
