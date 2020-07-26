class Component {
  constructor(props, updater) {
    this.props = props
    this.updater = updater
  }

  setState(state, callback) {
    this.updater.push()
  }
}

function createElement(type, config, children) {
  const props = {}
  let key = null

  const childrenLength = arguments.length - 2

  if (config != null) {
    Object.keys(config).forEach(key => {
      if (key === 'key') {
        key = config[key]
      } else {
        props[key] = config[key]
      }
    })
  }

  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    props.children = arguments.slice(2)
  }

  return {
    type,
    props,
    key
  }
}

const React = {
  Component,
  createElement
}

export { React as default, Component, createElement }
