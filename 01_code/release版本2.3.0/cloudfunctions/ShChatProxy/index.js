// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// 如果你的服务器需要鉴权，在此处添加 token
const API_URL = 'https://maas-api.cn-huabei-1.xf-yun.com/v2/api/chat'; // 替换为你的实际接口地址

exports.main = async (event, context) => {
  const { message } = event;
  
  try {
    const res = await cloud.openapi.cloudbase.request({
      url: API_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        message: message
      }
    });
    
    // 假设返回格式为 { text: '...', audio: '...' }
    return res.data;
    
  } catch (err) {
    console.error('云函数请求失败', err);
    return {
      text: '服务暂时不可用，请稍后再试。',
      audio: null
    };
  }
};