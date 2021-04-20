const spawn = require("child_process").spawn // 用于创建子进程

function startDaemon() {
  const daemon = spawn("node", ["daemon.js"], {
    // cwd: "/usr", // 指定当前子进程工作目录若不做设置默认继承当前工作目录
    detached: true, // 使子进程在父进程退出后继续运行
    stdio: "ignore", //退出父进程
  })

  console.log("守护进程开启 父进程 pid: %s, 守护进程 pid: %s", process.pid, daemon.pid)
  daemon.unref()
}

startDaemon()

/**
 * @守护进程实现 
 * https://cnodejs.org/topic/57adfadf476898b472247eac
 * 参考NODEJS 守护进程实现
 * 
 * @Node_js_进阶之进程与线程
 * https://www.imooc.com/article/288006
 */