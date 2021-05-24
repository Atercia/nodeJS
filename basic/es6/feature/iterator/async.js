/**
 * @AIM_为可迭代变量的生成一个异步迭代器
 * [Symbol.asyncIterator]为方法名，()表示立即调用并返回迭代器
 * (ins)[Symbol.asyncIterator]()
 * @HINT https://www.jianshu.com/p/34de7243407c
 * @createAsyncIterable 返回一个拥有异步遍历器接口的对象
 */

const asyncIterable = createAsyncIterable(["a", "b"])
const asyncIterator = asyncIterable[Symbol.asyncIterator]()

// 连续调用
asyncIterator
  .next()
  .then((iterResult1) => {
    console.log(iterResult1) // { value: 'a', done: false }
    return asyncIterator.next()
  })
  .then((iterResult2) => {
    console.log(iterResult2) // { value: 'b', done: false }
    return asyncIterator.next()
  })
  .then((iterResult3) => {
    console.log(iterResult3) // { value: undefined, done: true }
  })

//   放await后面
async function f() {
  const asyncIterable = createAsyncIterable(["a", "b"])
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()
  console.log(await asyncIterator.next())
  // { value: 'a', done: false }
  console.log(await asyncIterator.next())
  // { value: 'b', done: false }
  console.log(await asyncIterator.next())
  // { value: undefined, done: true }
}

/**
 * @AIM 注意,
 * 异步遍历器的next方法是可以连续调用的,
 * 不必等到上一步产生的Promise对象resolve以后在调用.
 * 这种情况下,next方法会累计起来,自动按照每一步的顺序运行下去.
 */

// 1.可以把所有的next方法放在Promise.all方法里面:
const asyncGenObj = createAsyncIterable(["a", "b"])
const [{ value: v1 }, { value: v2 }] = await Promise.all([asyncGenObj.next(), asyncGenObj.next()])

console.log(v1, v2) // a b

// 2.一次性调用所有的next方法,然后await最后一步操作
async function runner() {
  const writer = openFile("someFile.txt")
  writer.next("hello")
  writer.next("world")
  await writer.return()
}
runner()

/**
 * @AIM for await...of
新引入的for await...of用来循环异步的Iterator接口
createAsyncIterable()返回一个拥有异步遍历器接口的对象,
for...of循环自动调用这个对象的异步遍历器的next方法,会得到一个Promise对象.
await用来处理这个Promise对象,一旦resolve,就把得到的值传入for...of的循环体.
for await...of循环的一个用途,是部署了asnycIterable操作的异步接口,
可以直接放入这个循环.
 */

async function f() {
  try {
    for await (const x of createAsyncIterable(["a", "b"])) {
      console.log(x)
    }
  } catch (error) {}
}

// 注意，for await...of循环也可以用于同步遍历器。

;(async function () {
  for await (const x of ["a", "b"]) {
    console.log(x)
  }
})()
