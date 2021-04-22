// let _val = null
// let obj = {
//   val: null,
// }
// Object.defineProperty(obj, "val", {
//   get() {
//     console.info("GET")
//     return _val
//   },
//   set(val) {
//     console.info("SET")
//     _val = val
//   },
// })

// obj.val = "newVal"
// console.info(obj.val)

var obj = {},
  value = null
Object.defineProperty(obj, "num", {
  enumerable: true, //是否可枚举
  writable: true, //是否可写
  configurable: true, //是否可配置
  get: function () {
    console.log("执行了 get 操作")
    return value
  },
  set: function (newValue) {
    console.log("执行了 set 操作")
    value = newValue
  },
})
obj.value = 1 // 执行了 set 操作
console.log(obj.value) // 执行了 get 操作 // 1
