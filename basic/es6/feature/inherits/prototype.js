function a() {
  this._val = "_a"
}

a.prototype.getVal = function () {
  return this._val
}

function subA() {
  this._subVal = "_subA"
}
subA.prototype = new a()

subA.prototype.getSubVal = function () {
  return this._subVal
}

let ins = new subA()
let res = [
  ins.getVal(),
  ins.getSubVal(),
  Object.entries(a.prototype),
  Object.entries(subA.prototype),
  Object.entries(ins),
]
res.forEach(o=>{
  console.log(JSON.stringify(o))
})
