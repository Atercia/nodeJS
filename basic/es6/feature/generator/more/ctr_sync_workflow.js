// 控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

step1(function (value1) {
  step2(value1, function (value2) {
    step3(value2, function (value3) {
      step4(value3, function (value4) {
        // Do something with value4
      })
    })
  })
})
// 采用Promise改写上面的代码。

Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(
    function (value4) {
      // Do something with value4
    },
    function (error) {
      // Handle any error from step1 through step4
    }
  )
  .done()
// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量Promise的语法。Generator函数可以进一步改善代码运行流程。

function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1)
    var value3 = yield step2(value2)
    var value4 = yield step3(value3)
    var value5 = yield step4(value4)
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
// 然后，使用一个函数，按次序自动执行所有步骤。

scheduler(longRunningTask(initialValue))

function scheduler(task) {
  var taskObj = task.next(task.value)
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task)
  }
}
// 注意，上面这种做法，只适合同步操作，
// 即所有的task都必须是同步的，不能有异步操作。
// 因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。
// 如果要控制异步的操作流程，详见后面的《异步操作》一章。

// 下面，利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。

let steps = [step1Func, step2Func, step3Func]

function* iterateSteps(steps) {
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i]
    yield step()
  }
}
