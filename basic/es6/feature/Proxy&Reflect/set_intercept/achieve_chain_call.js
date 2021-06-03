// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作

var pipe = (function () {
  return function (value) {
    var funcStack = []
    var oproxy = new Proxy(
      {},
      {
        get: function (pipeObject, fnName) {
          if (fnName === "get") {
            return funcStack.reduce(function (val, fn) {
              return fn(val)
            }, value)
          }
          funcStack.push(window[fnName])
          return oproxy
        },
      }
    )

    return oproxy
  }
})()

var double = (n) => n * 2
var pow = (n) => n * n
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0

pipe(3).double.pow.reverseInt.get // 63
