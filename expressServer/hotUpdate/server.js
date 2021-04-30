var express = require("express")
var app = express()

app.use("/public", express.static("D:/public"))

const UPDATE_FILE_URL = "http://127.0.0.1:8083/update.zip"
// 或update.zip , 注意必须确保update.asar位于zip包的根目录
app.get("/", function (req, res) {
  res.send("Hello World")
})

app.post("/update", function (req, res) {
  res.write(
    JSON.stringify({
      name: "app",
      version: "2.2.3",
      asar: UPDATE_FILE_URL,
      info: "1.fix bug\n2.feat...",
    }).replace(/[\/]/g, "\\/")
  )
  res.end()
})
app.listen(8082)
console.log("basicServer run port: 8082")

var fileServer = app.listen(8083, function () {
  //   var host = fileServer.address()
  var port = fileServer.address().port
  console.info("fileServer run port 8083")
})
fileServer.on("error", (err) => {
  console.info({ START_FILE_SERVER_FAILED: err })
})
