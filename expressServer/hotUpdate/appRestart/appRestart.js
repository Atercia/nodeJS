const express = require("express")
const child_process = require("child_process")

const fs = require('fs');
const output = fs.createWriteStream('./stdout.txt');
const errorOutput = fs.createWriteStream('./stderr.txt');
const { Logger } = require('./logger');

const logger = Logger(output, errorOutput);


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

app.get("/startApp", function (req, res) {
  const d = new Date()
  const MSG = `${d.getHours()}:${d.getMinutes()} — 接收到重启请求`
  logger.log(MSG)
  res.send(MSG)
  setTimeout(() => {
    callRestartCmd()
  }, 4000) // 延时，确保老版本应用已经退出
})

function callRestartCmd() {
  const efIns = child_process.execFile(
    "智慧调度平台.cmd",
    null,
    { cwd: "D:/TODO/2021-5/dc/test", windowsHide: true }, // 应用目录
    function (error, stdout, stderr) {
      if (error !== null) {
        logger.log("子进程exec error" + error)
      } else logger.log("成功")
      logger.log(`"子进程stdout:${stdout || "-"}`)
      logger.log(`"子进程stderr:${stderr || "-"}`)
    }
  )

  efIns.on("close", (code) => {
    logger.log(`子进程使用代码 ${code} 关闭所有 stdio`)
  })

  efIns.on("exit", (code) => {
    logger.log(`子进程使用代码 ${code} 退出`)
  })
}

logger.log("监听8085端口")
app.listen(8085)
