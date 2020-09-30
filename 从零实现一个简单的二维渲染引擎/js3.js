// js3.js
import drawRect from './drawRect.js'

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')
drawRect(ctx, '#f00')
ctx.translate(50, 50)
drawRect(ctx, '#00f')
ctx.rotate(Math.PI / 4)
drawRect(ctx, '#0f0')
