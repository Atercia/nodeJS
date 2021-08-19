const { DB } = require("./init")
async function test() {
  const findResult = await DB.userColl.find({
    name: "熊",
  })
  return findResult
}
try {
  console.log("——————————")
  findResult().then((res) => {
    console.log({ res })
  })
} catch (error) {
  console.error({ error })
}
