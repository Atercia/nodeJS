// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。
// 结合get和set方法，就可以做到防止这些内部属性被外部读写。
var handler = {
  get(target, key) {
    invariant(key, "get")
    return target[key]
  },
  set(target, key, value) {
    invariant(key, "set")
    target[key] = value
    return true
  },
}
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
var target = {}
var proxy = new Proxy(target, handler)
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = "c"
// Error: Invalid attempt to set private "_prop" property

