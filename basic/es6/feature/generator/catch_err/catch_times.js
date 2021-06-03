// 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。

// 如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。

var g = function* () {
  while (true) {
    yield
    console.log("内部捕获", e)
  }
}

var i = g()
i.next()

try {
  i.throw("a")
  i.throw("b")
} catch (e) {
  console.log("外部捕获", e)
}
// 外部捕获 a
