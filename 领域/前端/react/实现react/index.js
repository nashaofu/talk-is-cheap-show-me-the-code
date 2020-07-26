import App from './app.js'
import React from './react/index.js'
import ReactDOM from './react-dom/index.js'

console.log(React.createElement(App))
ReactDOM.render(React.createElement(App), document.querySelector('#app'))
