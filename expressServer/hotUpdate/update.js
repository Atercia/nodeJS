var express = require("express")
var bodyParser = require("body-parser")
var app = express()
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
// app.use("/public", express.static("D:/public"))

// 或update.zip , 注意必须确保update.asar位于zip包的根目录
app.get("/", function (req, res) {
  res.send("Hello World")
})
var desktop_app_version = "2.2.5"
var desktop_app_URL =
  "http://qs9hmmjyf.hn-bkt.clouddn.com/update.zip?e=1620294658&attname=&token=YFYvys--tnzU5PsERz_aNHHyziYDyNPOQVYBWPPv:PjK5aXX3T7pkuyKKaGGxqRef0nU=" // or ../update.zip
// var desktop_app_URL = "http://127.0.0.1:8083/public/update.zip" // or ../update.zip

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
