/*
 * @Author: hejin
 */
import axios from 'axios'
import Cookie from 'js-cookie'
import { Message } from 'view-design'

axios.interceptors.request.use(config => {
  let token = Cookie.get('token');
  if (token) {
    //console.log(config.params.token);
    if (config.params) {
      //config.headers.Authorization = token;
    } else {
      config.params = {}
    }
    if (!config.params.token) {
      config.params.token = token;
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
});
// 统一检查返回状态值
function checkStatus(response) {
  if (response.data.success) {
    return response.data;
  } else if (response.data.success == false){
    Message.error(response.data.errorMsg || "请求失败");
    let error = new Error(response.data.errorMsg || "请求失败");
    return Promise.reject(error);
  } else {
    return response.data;
  }
}

axios.interceptors.response.use(response => {
  return checkStatus(response);
}, function (error) {
  console.error(error);
  Message.error("请求失败");
  return Promise.reject(error);
});

export default axios;
