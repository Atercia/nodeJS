// Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，
// 也继承了Generator函数的prototype对象上的方法。

function* g() {}

g.prototype.hello = function () {
  return "hi!"
}

let obj = g()

obj instanceof g // true
obj.hello() // 'hi!'
// 上面代码表明，Generator函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。
// 但是，如果把g当作普通的构造函数，并不会生效，
// 因为g返回的总是遍历器对象，而不是this对象。
function* g() {
  this.a = 11
}

let obj = g()
obj.a // undefined

// Generator函数也不能跟new命令一起用，会报错。

function* F() {
  yield (this.x = 2)
  yield (this.y = 3)
}

new F()
// TypeError: F is not a constructor

// 让一个gen实例能就像一个普通函数一样，支持this.属性 和 new 构造函数,

function* gen() {
  this.a = 1
  yield (this.b = 2)
  yield (this.c = 3)
}

function F() {
  return gen.call(gen.prototype)
}

var f = new F()

f.next() // Object {value: 2, done: false}
f.next() // Object {value: 3, done: false}
f.next() // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
