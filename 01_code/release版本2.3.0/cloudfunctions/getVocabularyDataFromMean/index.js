// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var val = event.value  //值
  var lim = event.limit  //额度
  var page = event.page  //页码
  return await db.collection("vocabulary")
  .where({
    explanation: new db.RegExp({  //正则表达式模糊搜索
      regexp:val,
      options:"i"
    })
  })
  .limit(lim)
  .skip(page)
  .get()
}