const spawn = require("child_process").spawn
const child = spawn("node", ["work.js"])

child.stdout.pipe(process.stdout)
console.log(process.pid, child.pid)
