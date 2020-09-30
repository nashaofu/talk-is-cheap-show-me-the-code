// js4.js
function draw(color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.strokeStyle = color
  // x:50,y:50,宽100高50的矩形
  ctx.moveTo(50, 50)
  ctx.lineTo(150, 50)
  ctx.lineTo(150, 100)
  ctx.lineTo(50, 100)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')

draw('#f00')

ctx.translate(50, 50)
draw('#00f')

let rad = Math.PI / 4
ctx.rotate(rad)
draw('#0f0')

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
let x2

if ((rad + Math.PI / 2) % Math.PI !== 0) {
  x2 = y1 * sin - x1 * sin * tan + x1 / cos
} else {
  // 90°的奇数倍的角度cos为0
  // 单独处理一下
  x2 = y1 * sin
}

let y2 = y1 * cos - x1 * sin

// 在旋转后的坐标中，旋转后的矩形和未旋转矩形的中心的距离在x和y方向的分量
let dx = x2 - x1
let dy = y2 - y1

// 在旋转后的坐标系下向x，y方向平移
ctx.translate(dx, dy)
draw('rgba(0,0,0,0.6)')
