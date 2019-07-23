define(['jquery', 'lodash'], ($, _) => ({
  getTime() {
    const time = new Date()
    const year = time.getFullYear()
    const month = _.padStart(time.getMonth() + 1, 2, '0')
    const date = _.padStart(time.getDate(), 2, '0')
    const hour = _.padStart(time.getHours(), 2, '0')
    const minute = _.padStart(time.getMinutes(), 2, '0')
    const second = _.padStart(time.getSeconds(), 2, '0')
    return `${year}/${month}/${date} ${hour}:${minute}:${second}`
  }
}))
