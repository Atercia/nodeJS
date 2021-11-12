// yield*语句，用来在一个Generator函数里面执行另一个Generator函数。
function* foo() {
  yield "a"
  yield "b"
}

function* bar() {
  yield "x"
  yield* foo()
  yield "y"
}

// 等同于
function* bar() {
  yield "x"
  yield "a"
  yield "b"
  yield "y"
}

// 等同于
function* bar() {
  yield "x"
  for (let v of foo()) {
    yield v
  }
  yield "y"
}

// for (let v of bar()) {
//   console.log(v)
// }


