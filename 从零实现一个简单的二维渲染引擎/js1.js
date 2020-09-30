// js1.js
import drawRect from './drawRect.js'

const $canvas = document.querySelector('#canvas')
$canvas.width = 400
$canvas.height = 300
const ctx = $canvas.getContext('2d')
drawRect(ctx, '#f00')
