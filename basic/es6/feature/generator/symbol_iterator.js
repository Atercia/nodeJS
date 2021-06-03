// 让对象适用迭代器的方法 - 利用generator函数赋值给对象
function* objectEntries() {
  let propKeys = Object.keys(this)

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]]
  }
}

let jane = { first: "Jane", last: "Doe" }

jane[Symbol.iterator] = objectEntries

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`)
}
// first: Jane
// last: Doe
