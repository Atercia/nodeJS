// deleteProperty()
// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

var handler = {
  deleteProperty(target, key) {
    invariant(key, "delete")
    return true
  },
}
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

var target = { _prop: "foo" }
var proxy = new Proxy(target, handler)
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
// 上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。

// defineProperty()
// defineProperty方法拦截了Object.defineProperty操作。

var handler = {
  defineProperty(target, key, descriptor) {
    return false
  },
}
var target = {}
var proxy = new Proxy(target, handler)
proxy.foo = "bar"
// TypeError: proxy defineProperty handler returned false for property '"foo"'
// 上面代码中，defineProperty方法返回false，导致添加新属性会抛出错误。
