/**
 * @探索异步迭代器在_nodejs_中的使用
 * https://www.nodejs.red/#/nodejs/advanced/asynciterator-in-nodejs
 */

// const ite = on(ee, "foo")

// process.nextTick(() => {
//   ee.emit("foo", "Hello")
//   ee.emit("foo", "Node.js")
//   // ite.return(); // 调用后可以结束 for await...of 的遍历
//   // ite.throw() // 迭代器对象抛出一个错误
// })

// try {
//   for await (const event of ite) {
//     console.log(event) // prints ['Hello'] ['Node.js']
//     await sleep(2000)
//   }
// } catch (err) {
//   console.log(err.message)
// }

// // Unreachable here
// console.log("这里将不会被执行")

/**
 * @开启服务器 events.on() 开启一个 Node.js 服务器
 */
const http = require("http")
let on = require("events").on
const ee = on(http.createServer().listen(3000), "request")
for await (const [{ url }, res] of ee)
  if (url === "/hello") res.end("Hello Node.js!")
  else res.end("OK!")

// function sleep(time) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, time)
//   })
// }
