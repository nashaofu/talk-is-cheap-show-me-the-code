import ReactRoot from './ReactRoot.js'

function render(reactElement, container) {
  let root = container._reactRootContainer
  if (!root) {
    root = container._reactRootContainer = new ReactRoot(container, false)
  }
  root.render(reactElement)
}

const ReactDOM = {
  render
}

export { ReactDOM as default, render }
