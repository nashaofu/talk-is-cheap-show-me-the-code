// js4.js
import drawRect from './drawRect.js'

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')

function translate(x, y) {
  ctx.translate(x, y)
}

// 旋转图形函数
function rotate(rad, x = 0, y = 0) {
  ctx.rotate(rad)
  let sin = Math.sin(rad)
  let cos = Math.cos(rad)
  let tan = Math.tan(rad)

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
}

class Rect {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }
  rotate(rad) {
    // 中心旋转
    rotate(rad, this.x + this.width / 2, this.y + this.height / 2)
  }
  translate(x, y) {
    translate(x, y)
  }
  render(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = this.color
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.width, this.y)
    ctx.lineTo(this.x + this.width, this.y + this.height)
    ctx.lineTo(this.x, this.y + this.height)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }
}

const rect1 = new Rect(0, 0, 100, 50, 'red')
const rect2 = new Rect(100, 100, 100, 50, 'blue')

let r1 = Math.PI / 10
let r2 = Math.PI / 8
let x = 0
let y = 0
function render() {
  ctx.clearRect(0, 0, 400, 300)
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  rect2.translate(x, y)
  rect1.rotate(r1)
  rect1.render(ctx)
  r1 += Math.PI / 10
  x += 1
  y += 1
  if (x > 400) {
    x = -100
  }
  if (y > 300) {
    y = -50
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0)

  rect2.rotate(r2)
  rect2.render(ctx)
  r2 += Math.PI / 8
  ctx.setTransform(1, 0, 0, 1, 0, 0)

  requestAnimationFrame(render)
}

render()
