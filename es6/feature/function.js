// 参数解构赋值
let a = { t: 1, e: 2 }

function test({ t, e, c = "3" }) {
  console.info(t, e, c)
}
test(a)
