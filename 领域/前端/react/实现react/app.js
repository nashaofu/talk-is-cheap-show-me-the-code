import React, { Component } from './react/index.js'

export default class App extends Component {
  state = {
    val: 1
  }

  render() {
    return React.createElement('h1', { class: 'my-h1' }, this.state.val)
  }
}
