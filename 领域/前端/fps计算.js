const div = document.createElement('div')
document.body.appendChild(div)
div.style.position = 'fixed'
div.style.top = 0
div.style.right = 0
div.style.zIndex = 9999
div.style.background = '#000'
div.style.color = '#fff'
div.style.padding = '20px'

var frame = 0
var lastTime = Date.now()
var lastFameTime = Date.now()

var loop = function () {
  var now = Date.now()
  lastFameTime = now
  frame++

  if (now > 1000 + lastTime) {
    var fps = Math.round((frame * 1000) / (now - lastTime))
    div.innerHTML = `${fps}fps`
    frame = 0
    lastTime = now
  }

  requestAnimationFrame(loop)
}

loop()
