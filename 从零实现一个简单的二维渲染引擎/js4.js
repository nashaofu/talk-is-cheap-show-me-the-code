// js4.js
import drawRect from './drawRect.js'

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')

drawRect(ctx, '#f00')

ctx.translate(50, 50)
drawRect(ctx, '#00f')

let rad = Math.PI / 4
ctx.rotate(rad)
drawRect(ctx, '#0f0')

let sin = Math.sin(rad)
let cos = Math.cos(rad)
let tan = Math.tan(rad)

// 图形中心在相对坐标系中的位置
let x = 100
let y = 75

// 在旋转前的坐标中，未旋转矩形的中心位置
let x1 = x
let y1 = y

// 在旋转后的坐标中，未旋转矩形的中心位置
// 90°的奇数倍的角度cos为0
// 单独处理一下
let x2 = (rad / Math.PI / 2) % 2 === 0 ? y1 * sin : x1 / cos - x1 * sin * tan + y1 * sin
let y2 = y1 * cos - x1 * sin

// 在旋转后的坐标中，旋转后的矩形和未旋转矩形的中心的距离在x和y方向的分量
let dx = x2 - x1
let dy = y2 - y1

// 在旋转后的坐标系下向x，y方向平移
ctx.translate(dx, dy)
drawRect(ctx, 'rgba(0,0,0,0.6)')
