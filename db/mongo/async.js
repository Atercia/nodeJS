const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/demo"

async function dataOperate() {
  var conn = null
  try {
    conn = await MongoClient.connect(url)
    console.log("数据库已连接")
    const test = conn.db("demo").collection("te")
    // 增加
    await test.insertOne({ site: "runoob.com" })
    // 查询
    var arr = await test.find().toArray()
    console.log(arr)
    // 更改
    await test.updateMany({ site: "runoob.com" }, { $set: { site: "example.com" } })
    // 查询
    arr = await test.find().toArray()
    console.log(arr)
    // 删除
    await test.deleteMany({ site: "example.com" })
    // 查询
    arr = await test.find().toArray()
    console.log(arr)
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (conn != null) conn.close()
  }
}

dataOperate()
