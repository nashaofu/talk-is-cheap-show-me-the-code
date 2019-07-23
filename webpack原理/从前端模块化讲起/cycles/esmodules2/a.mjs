import * as b from './b'

// c是值引用
const { c } = b
console.log(b, c)
// b是地址引用
export { c,  b }
// d是值引用
export let d = b.c
