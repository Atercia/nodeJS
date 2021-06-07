/**
 * 节流
 * @param {*} func 执行函数
 * @param {*} delay 节流时间,毫秒
 */
const throttle = function (func, delay) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        // 或者直接 func()
        timer = null
      }, delay)
    }
  }
}
function test() {
  console.log("TEST")
}
let action = throttle(test, 50)
action()
action()
action()
action()
action()
action()
/**
 * 防抖
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间,毫秒
 */
const debounce = function (fn, wait) {
  let timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout) // 如果多次触发将上次记录延迟清除掉
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      // 或者直接 fn()
      timeout = null
    }, wait)
  }
}
/**
 * @AIM 状态机、迭代器
 */
function* iterator(list) {
  let lastIdx = list.length - 1
  let curIdx = 0
  while (true) {
    const change = yield list[curIdx]
    curIdx += change
    if (curIdx > lastIdx) curIdx = 0
    if (curIdx < 0) curIdx = lastIdx
  }
}
let t = iterator([{ g: 1 }, { g: 2 }, { g: 3 }])
// 上面的Generator实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，
// 这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。
// Generator之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。
console.log("t", t.next(1).value.g)
console.log("t", t.next(1).value.g)
console.log("t", t.next(-1).value.g)
console.log("t", t.next(1).value.g)

// case2
function* stateMachine() {
  while (true) {
    yield "A"
    yield "B"
    yield "C"
  }
}
