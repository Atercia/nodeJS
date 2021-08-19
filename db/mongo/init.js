const MongoClient = require("mongodb").MongoClient
const mongodbUrl = "mongodb://localhost:27017/demo"
const DB = { name: "test" }
const userCollName = "user" //指定集合名

// async function run() {
//   const cursor = DB.userColl?.find()
//   while (cursor.hasNext()) {
//     console.log(cursor.next())
//   }
// }
//封装初始化数据库方法
const init = () => {
  if (DB.db) {
    return Promise.reject("mongodb has already initialized")
  }

  return MongoClient.connect(mongodbUrl).then((db) => {
    DB.db = db
    DB.userColl = db.db("demo").collection(userCollName)

    //退出关闭mongodb数据库连接
    process.on("exit", () => db.close())

    console.log("mongodb initialized")
    const cursor = DB.userColl.find()
    while (cursor.hasNext()) {
      console.log(cursor.next())
    }
    // run()
    // try {
    //   DB.userColl
    //     .find({
    //       name: "熊",
    //     })
    //     .forEach(console.dir)
    //   DB.userColl
    //     .findOne({
    //       name: "熊",
    //     })
    //     .then((res) => {
    //       console.log({ res, name: res.name })
    //     })
    // } catch (error) {
    //   console.error({ error })
    // }
  })
}

init()
// module.exports.DB = DB
