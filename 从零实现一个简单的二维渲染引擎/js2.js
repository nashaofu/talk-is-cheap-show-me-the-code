// js2.js
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
// 图形整体向右向下移动50
// 采用坐标系平移的方式
ctx.translate(50, 50)
draw('#00f')
