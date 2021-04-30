const fs = require("fs")

const iStream = fs.createReadStream("input.txt") // 输入
const oStream = fs.createWriteStream("output.txt") // 输出
iStream.pipe(oStream) // 管道读写 - 输入流向输出
