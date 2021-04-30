let p1 = new Promise((resolve, reject) => {
  console.info("T!")
  let num = Math.round(Math.random() * 10)
  if (num > 1) {
    resolve("NO1:" + num)
  } else {
    reject("NO1:" + num)
  }
})
let p2 = new Promise((resolve, reject) => {
  let num = Math.round(Math.random() * 10)
  if (num > 1) {
    resolve("NO2:" + num)
  } else {
    reject("NO2:" + num)
  }
})

console.info("T!2")
// p1.then((res) => {
//   console.info("OK", res)
// }).catch((err) => {
//   console.error("ERR", err)
// })

// Promise.all([p1, p2]).then(
//   (res) => {
//     console.info({ res })
//   },
//   (err) => {
//     console.info({ err })
//   }
// )

Promise.race([p1, p2]).then(
  (res) => {
    console.info({ res })
  },
  (err) => {
    console.info({ err })
  }
)
