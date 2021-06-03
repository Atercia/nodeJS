// 遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。
// 并且，Generator函数的遍历就终止了，返回值的done属性为true，
// 以后再调用next方法，done属性总是返回true。

// 如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

function* numbers() {
  yield 1
  try {
    yield 2
    yield 3
  } finally {
    yield 4
    yield 5
  }
  yield 6
}
var g = numbers()
g.next() // { done: false, value: 1 }
g.next() // { done: false, value: 2 }
g.return(7) // { done: false, value: 4 } // 相当于在finally函数内最后加了一个yield 7
g.next() // { done: false, value: 5 }
g.next() // { done: true, value: 7 }
// 上面代码中，调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。
