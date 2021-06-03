// 利用for...of循环，可以写出遍历任意对象（object）的方法。原生的JavaScript对象没有遍历接口，无法使用for...of循环，
// 通过Generator函数为它加上这个接口，就可以用了。

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}

let jane = { first: "Jane", last: "Doe" }

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`)
}
// first: Jane
// last: Doe

// 类似于 Object.entries(jane)
