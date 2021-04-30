
/**
 * @EVENTS_ON 通过异步迭代 event.on(eventEmitter,'eventName')，
 * 来处理不需要并发情况下的异步顺序事件响应处理
 */

/**
 * @STREAM 异步迭代处理readable 流
 */

const fs = require("fs")
const readable = fs.createReadStream("./hello.txt", {
  encoding: "utf-8",
  highWaterMark: 1,
})

//  以往当我们读取一个文件时，需要监听 data 事件，拼接数据，在 end 事件里判断完成
//  现在通过异步迭代器能以一种更简单的方式实现，如下所示：

async function readText(readable) {
  let data = ""
  for await (const chunk of readable) {
    data += chunk
    // await sleep(500)
    // console.log(chunk) // t e s t , 1
  }
  return data
}
//  现在我们可以调用 readText 做测试。

// ;(async () => {
//   try {
//     const res = await readText(readable)
//     console.log(res) // Hello Node.js
//   } catch (err) {
//     console.log(err.message)
//   }
// })()
async function getRes() {
  try {
    const res = await readText(readable)
    console.log(res) // Hello Node.js
  } catch (err) {
    console.log(err.message)
  }
}
getRes()

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
