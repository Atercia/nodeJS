const buf = Buffer.from("Node.js 技术栈", "UTF-8")

console.log(buf)
console.log(buf.length) // 17
console.log(buf.toString("UTF-8", 0, 9))

/**
 * @AIM 转换过程中为什么出现乱码？
 * @HINT 一个中文在 UTF-8 下占用 3 个字节
 * 技 这个字在 buf 中对应的字节为 8a 80 e6 
 * 而我们的设定的范围为 0～9 因此只输出了 8a，
 * 这个时候就会造成字符被截断出现乱码。
 */

 console.log(buf.toString("UTF-8", 0, 9))

 console.log(buf.toString("UTF-8", 0, 11))