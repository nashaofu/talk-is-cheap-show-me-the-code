define((require, exports, module) => {
  const $ = require('jquery')
  const time = require('./time.js')
  $('#time').text('TIME: ' + time.getTime())
  setInterval(() => {
    $('#time').text('TIME: ' + time.getTime())
  }, 1000)
})
