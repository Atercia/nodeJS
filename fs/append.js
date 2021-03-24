const fs = require("fs")
// const path = './test/1.txt'
// const path = "/TODO/1.txt"
// const path = "D:/TODO/1.txt"
const path = "C:/hgs/1.txt"
fs.open(path, "a", (err, fd) => {
  if (err) throw err
  fs.appendFile(fd, "追加的数据2", "utf8", (err) => {
    fs.close(fd, (err) => {
      if (err) throw err
    })
    if (err) throw err
  })
})
