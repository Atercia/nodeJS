const b1 = Buffer.from("251")
const b2 = Buffer.from("251242", "utf8")
const b3 = Buffer.from([10])
const b4 = Buffer.from(b3)

console.log(b1, b2, b3, b4)
/**
 * @AIM 创建一个大小为 10 个字节的缓冲区
 */
const bAlloc1 = Buffer.alloc(10)

console.log(bAlloc1)

/**
 * @AIM 创建一个未初始化的 Buffer
 */
const bAllocUnsafe1 = Buffer.allocUnsafe(10)

console.log(bAllocUnsafe1) //
