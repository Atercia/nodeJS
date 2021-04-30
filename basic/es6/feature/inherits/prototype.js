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
let res = [ins.getVal(), ins.getSubVal(), a.prototype]
console.log(res)
