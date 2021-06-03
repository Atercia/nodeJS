// yield未加星号，则表示不遍历，直接返回
// 加星号，则表示遍历返回
function* inner() {
  yield "hello!"
}

function* outer1() {
  yield "open"
  yield inner()
  yield "close"
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield "open"
  yield* inner()
  yield "close"
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"

// 实际上，任何数据结构只要有Iterator接口，就可以被yield*遍历。

// case1
function* gen() {
  yield* ["a", "b", "c"]
}

gen().next() // { value:"a", done:false }

// case2
let read = (function* () {
  yield "hello"
  yield* "hello"
})()

read.next().value // "hello"
read.next().value // "h"
