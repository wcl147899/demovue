import axios from 'axios'
import router from '../router';
import { Message } from 'element-ui';

//创建axois实例
const request = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/1805444-0-default',
    timeout: 5000,
    responseType: 'json',
    headers: {
         "Conten-Type": "appplication/x-www-form-urlencoded;charset=utf-8"
    }
})

//请求拦截器：统一设置token
request.interceptors.request.use(config => {
    console.log("我是请求拦截器下成功返回的config");
    console.log(config);
    let token =sessionStorage.getItem('token');
    console.log(token);//null =>首次登录在请求拦截器中token还没设置
    if (token && token !== null) {
        config.headers.Authorization = token;
    }
    return config
}, error => {
    return Promise.reject(error)
});

//拦截响应器
request.interceptors.response.use(
    response => {
    console.log("我是响应拦截器的response");
    console.log(response);
    if (response.data.code === "10012") {
      Message.error("登录已过期，请重新登录！");
      sessionStorage.removeItem('token');
      router.push({ path: "/login" });
    } 
    return response.data;
    },error => {
      console.log('error' + error)
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error, message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权。请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误，未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = '未知错误${ error.response.status }';
            }
        } else { 
            error.message = '连接服务器失败';
        }  
      return Promise.reject(error)
    }
)

//导出实例
export default request