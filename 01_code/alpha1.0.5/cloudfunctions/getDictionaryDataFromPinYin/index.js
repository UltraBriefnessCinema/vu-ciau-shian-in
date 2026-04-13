//written by Mr.Gao in Xiaokunshan, songjiang, shanghai, 20220420235700
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db=cloud.database()
  var val = event.value


  //获取数据总个数
  return await db.collection("dictionary")
  .where({
    pinYinSearch: new db.RegExp({  //正则表达式模糊搜索
      regexp: val,
      options:"i"
    })
  })
  .get()
}