/**
 * @AIM 内存泄漏识别 （Garbage Collector）
 */
/**
 * 单位为字节格式为 MB 输出
 */
const format = function (bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB"
}

/**
 * 封装 print 方法输出内存占用信息
 */
const print = function () {
  const memoryUsage = process.memoryUsage()

  console.log(
    JSON.stringify({
      // （resident set size）：RAM 中保存的进程占用的内存部分，包括代码本身、栈、堆。
      rss: format(memoryUsage.rss),
      // 堆中总共申请到的内存量
      heapTotal: format(memoryUsage.heapTotal),
      // 堆中目前用到的内存量，判断内存泄漏我们主要以这个字段为准
      heapUsed: format(memoryUsage.heapUsed),
      // V8 引擎内部的 C++ 对象占用的内存。
      external: format(memoryUsage.external),
    })
  )
}

/**
 * @AIM TEST
 */

// example.js
function Quantity(num) {
  if (num) {
    return new Array(num * 1024 * 1024)
  }

  return num
}

function Fruit(name, quantity) {
  this.name = name
  this.quantity = new Quantity(quantity)
}

let apple = new Fruit("apple")
print()

//  banana 我们对它的 quantity 属性创建了一个很大的数组空间
// 导致 heapUsed 飙升到 164.24 MB
let banana = new Fruit("banana", 5)
print()

banana = null; // 让根节点无法通过banana指向fruit实例，使得其能够被垃圾回收
global.gc()
print()


/**
 * @SCRIPT - node --expose-gc index
 * --expose-gc 允许手动垃圾回收 global.gc()
 */