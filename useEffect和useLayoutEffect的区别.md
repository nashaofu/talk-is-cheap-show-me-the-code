# useEffect和useLayoutEffect的区别

* `useEffect` 在 render 结束后，会先让浏览器渲染，然后再执行回调
* `useLayoutEffect` 在 render 结束后，立即再执行回调，和`componentDidMount`、`componentDidUpdate`行为一致，都是同步执行


```jsx
import React, { useEffect, useLayoutEffect, useRef } from 'react'

export default () => {
  const ref = useRef(null)

  useEffect(() => {
    // 使用 useEffect 元素会先在left:0的位置，然后跳到600，中间有一次停顿，会有闪烁
    console.log('useEffect')
    ref.current.style.left = '600px'
    console.log(ref.current.style.left)
  }, [])

  useLayoutEffect(() => {
    // 使用 useLayoutEffect 以下代码会被同步执行，浏览器还没有渲染出left：0就直接被修改为600了
    // 到渲染时也就是600，所以不会有闪烁
    console.log('useLayoutEffect')
    ref.current.style.left = '600px'
    console.log(ref.current.style.left)
  }, [])

  return (
    <div>
      <div
        ref={ref}
        className="square"
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          position: 'absolute'
        }}
      >
        square
      </div>
    </div>
  )
}
```
