let Schema = mongoose.Schema
// 创建定义数据库结构
const Mytest = new Schema({
  name: String,
  age: "number",
  sports: {
    basketBall: String,
  },
  math: Mixed,
  headImg: Buffer,
  something: Array,
  birthday: Date,
  some: Boolean,
})
