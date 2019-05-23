function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}

function _getPrototypeOf(o) {
  return o.__proto__
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })

  if (superClass) subClass.__proto__ = superClass
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var A =
  /* #__PURE__ */
  (function() {
    function A() {
      _classCallCheck(this, A)

      console.log(this)
    }

    _createClass(A, [
      {
        key: 'a',
        value: function a() {}
      }
    ])

    return A
  })()

var B =
  /* #__PURE__ */
  (function(_A) {
    _inherits(B, _A)

    function B() {
      _classCallCheck(this, B)

      return _possibleConstructorReturn(this, _getPrototypeOf(B).apply(this, arguments))
    }

    _createClass(B, [
      {
        key: 'b',
        value: function b() {}
      }
    ])

    return B
  })(A)

var C =
  /* #__PURE__ */
  (function(_B) {
    _inherits(C, _B)

    function C() {
      var _this

      _classCallCheck(this, C)

      _this = _possibleConstructorReturn(this, _getPrototypeOf(C).call(this))
      console.log(arguments)
      return _this
    }

    _createClass(C, [
      {
        key: 'c',
        value: function c() {}
      }
    ])

    return C
  })(B)

var c = new C()
