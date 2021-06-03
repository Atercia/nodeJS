// Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35


// 同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function (target, name) {
    if (name === "prototype") {
      return Object.prototype
    }
    return "Hello, " + name
  },

  apply: function (target, thisBinding, args) {
    return args[0]
  },

  construct: function (target, args) {
    return { value: args[1] }
  },
}

var fproxy = new Proxy(function (x, y) {
  return x + y
}, handler)

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"
