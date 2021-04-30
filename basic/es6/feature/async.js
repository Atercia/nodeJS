function a1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("a1 result ,use time 2")
    }, 2000)
  })
}
function a2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("a2 result , use time 0.5")
      resolve("a2 result , use time 0.5")
    }, 500)
  })
}
/**
 * @async 在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象;
 *
 * 所以async里面的函数会马上执行，这个就类似Generator的‘*’
 * ———————————————————————————————
 * @await 后面是Promise对象会阻塞后面的代码，Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果;
 *
 * await后面不是Promise对象，直接执行;
 *
 * 所以这就是await必须用在async的原因，async刚好返回一个Promise对象，可以异步执行阻塞;
 * ———————————————————————————————
 */
async function todo() {
  const v1 = await a1()
  console.info("finish a1")
  const v2 = await a2()
  throw new Error("test")
  console.info("finish a2")
  return { v1, v2 }
}

todo()
  .then((res) => {
    console.info("THEN_VALUE:", res)
  })
  .catch((e) => {
    console.info("CATCH_ERR:", e)
  })

// https://juejin.cn/post/6844904022223110151#heading-30

// sleep延时实现————————————————————

// async function doMain() {
//   console.info("1")

//   await sleep(2000) // 间隔 2 秒钟输出

//   console.info("2")
// }

// doMain()

// async function sleep(s) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(1)
//     }, s)
//   })
// }
