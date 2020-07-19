module.exports = [
  {
    name: '@uyun-cdn',
    dependencies: []
  },
  {
    name: '@uyun-charts',
    dependencies: ['@uyun-cdn', 'classnames-bundle', 'lodash-bundle', 'react-bundle', 'redux-bundle']
  },
  {
    name: '@uyun-components',
    dependencies: ['@uyun-cdn', 'classnames-bundle', 'lodash-bundle', 'moment-bundle', 'react-bundle']
  },
  {
    name: '@uyun-ec-basic-layout',
    dependencies: ['@uyun-cdn', '@uyun-components', 'react-bundle']
  },
  {
    name: '@uyun-utils',
    dependencies: ['@uyun-cdn', 'axios-bundle']
  },
  {
    name: 'axios-bundle',
    dependencies: ['@uyun-cdn']
  },
  {
    name: 'classnames-bundle',
    dependencies: ['@uyun-cdn']
  },
  {
    name: 'lodash-bundle',
    dependencies: ['@uyun-cdn']
  },
  {
    name: 'mobx-bundle',
    dependencies: ['@uyun-cdn', 'react-bundle']
  },
  {
    name: 'moment-bundle',
    dependencies: ['@uyun-cdn']
  },
  {
    name: 'react-bundle',
    dependencies: ['@uyun-cdn']
  },
  {
    name: 'react-router-bundle',
    dependencies: ['@uyun-cdn', 'react-bundle']
  },
  {
    name: 'redux-bundle',
    dependencies: ['@uyun-cdn', 'react-bundle']
  },
  {
    name: 'rxjs-bundle',
    dependencies: ['@uyun-cdn']
  }
]
