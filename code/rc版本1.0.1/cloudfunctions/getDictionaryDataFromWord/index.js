//written by Mr.Gao in Xiaokunshan, songjiang, shanghai, 20220420235700
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var val = event.val  //值
  var lim = event.limit

  return await db.collection("dictionary")
  .where({
    word: new db.RegExp({  //正则表达式模糊搜索
      regexp:val,
      options:"i"
    })
  })
  .limit(lim)
  .get()
  
}