var express = require("express")
var bodyParser = require("body-parser")
var app = express()

const desktop_app_version = "2.2.10"
const desktop_app_URL = "http://127.0.0.1:8082/update/update.zip" // or ../update.zip
// "http://qs9hmmjyf.hn-bkt.clouddn.com/update.zip?e=1620300615&attname=&token=YFYvys--tnzU5PsERz_aNHHyziYDyNPOQVYBWPPv:fwhrAK_Bv6yQUa5lOyJtXFC7pG8=" // or ../update.zip

app.all("*", function (req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", "*")
  // 设置服务器支持的所有头信息字段
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken"
  )
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
  if (req.method.toLowerCase() == "options") {
    res.send(200) // 让options尝试请求快速结束
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/update", express.static("C:/update"))
// app.use("/public", express.static("D:/public"))

// 或update.zip , 注意必须确保update.asar位于zip包的根目录
app.get("/", function (req, res) {
  res.send("Hello World")
})

app.post("/update", function (req, res) {
  const d = new Date()
  console.info(`${d.getHours()}:${d.getMinutes()} — 接收到更新请求`)
  if (req.body && req.body.current != desktop_app_version) {
    // check for server side
    res.write(
      JSON.stringify({ last: desktop_app_version, source: desktop_app_URL }).replace(
        /[\/]/g,
        "\\/"
      )
    )
  } else {
    res.write(JSON.stringify({ last: desktop_app_version }).replace(/[\/]/g, "\\/"))
  }
  res.end()
})

app.listen(8082)
console.log("basicServer run port: 8082")
