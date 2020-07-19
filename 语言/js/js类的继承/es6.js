class A {
  constructor () {
    console.log(this)
  }
  a () {}
}

class B extends A {
  b () {}
}

class C extends B {
  constructor () {
    super()
    console.log(arguments)
  }
  c () {}
}

const c = new C()
