// 如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。

function* foo() {
  yield 2
  yield 3
  return "foo"
}

function* bar() {
  yield 1
  var v = yield* foo()
  console.log("v: " + v)
  yield 4
}

var it = bar()

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next()
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}
