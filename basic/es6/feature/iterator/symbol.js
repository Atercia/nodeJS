/**
 * @AIM (ins)[Symbol.iterator]()
 * @HINT arr,set,map,arguments,str,NodeList都适用，对象不适用
 * https://mp.weixin.qq.com/s/UI3r3u50vYkrUTVe2DS86A
 */

/**
 * @arr_set_map
 */

console.log([][Symbol.iterator]()) // Object [Array Iterator] {}
console.log(new Map()[Symbol.iterator]()) // [Map Entries] {  }
console.log(new Set()[Symbol.iterator]()) // [Set Iterator] {  }
console.log({}[Symbol.iterator]) // undefined

/**
 * @str
 */

const str = "nodejs"
console.log(str[Symbol.iterator]()) // Object [String Iterator] {}

for (const val of str) {
  console.log(val) // n o d e j s
}

/**
 * @arguments
 */

function print() {
  console.log(arguments[Symbol.iterator]()) // Object [Array Iterator] {}
  for (const val of arguments) {
    console.log(val) // n o d e
  }
}
print("n", "o", "d", "e")

/**
 * @NEXT
 */

const arr = ["N", "o", "d", "e"]
const iterator = arr[Symbol.iterator]()
let item = {}
while (!item.done) {
  item = iterator.next()
  console.log(item) // { value: 'N', done: false }
}
