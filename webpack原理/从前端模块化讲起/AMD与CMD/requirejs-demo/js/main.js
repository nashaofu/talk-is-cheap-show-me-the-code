requirejs.config({
  baseUrl: '/js/',
  paths: {
    jquery: './lib/jquery',
    lodash: './lib/lodash'
  }
})

require(['jquery', './js/time.js'], ($, time) => {
  $('#time').text('TIME: ' + time.getTime())
  setInterval(() => {
    $('#time').text('TIME: ' + time.getTime())
  }, 1000)
})

// OR
// require(['./js/time.js'], function(time) {
//   require(['jquery'], function($) {
//     $('#time').text('TIME: ' + time.getTime())
//     setInterval(() => {
//       $('#time').text('TIME: ' + time.getTime())
//     }, 1000)
//   })
// })
