// drawRect.js
export default function drawRect(ctx, color) {
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
