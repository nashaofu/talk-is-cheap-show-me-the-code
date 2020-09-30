// js2.js
import drawRect from './drawRect.js'

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')
drawRect(ctx, '#f00')
// 图形整体向右向下移动50
// 采用坐标系平移的方式
ctx.translate(50, 50)
drawRect(ctx, '#00f')
