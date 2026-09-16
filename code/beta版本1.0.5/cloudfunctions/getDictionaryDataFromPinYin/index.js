//written by Mr.Gao in Xiaokunshan, songjiang, shanghai, 20220420235700
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var val = event.value
  var lim = event.limit
  var page = event.page

  //获取数据总个数
  return await db.collection("dictionary")
  .where({
    pinYinSearch: val
  })
  .limit(lim)
  .skip(page)
  .get()
}