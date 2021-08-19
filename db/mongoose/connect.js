const mongoose = require("mongoose")
// 链接地址: mongodb:username:password@host:prot/database
const url = "mongodb://localhost:27017/demo"
// {useNewUrlParser: true} 使用新url解释器 此处不加会报错，暂时未找到原因
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("链接失败")
  } else {
    console.log("链接成功")
  }
})
mongoose.disconnect(function () {
  // 断开数据库连接
  console.log("断开链接")
})
