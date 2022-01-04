import axios from "axios";
import {config} from "@/config";

axios.defaults.baseURL = config.API_SERVER;
axios.defaults.baseWSURL = 'ws://localhost:8080';
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

// 对请求进行拦截
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      config.headers.Authorization = "Bearer " + localStorage.JWT_TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 对错误的响应进行拦截
axios.interceptors.response.use(
  response => {
    // switch (response.data.code) {
    //
    // }
    return response;
  },
  error => {
    switch(error.response.status) {
      case 401:
        break;
    }
    // return error.response.data;
    return Promise.reject(error.response);
  }
)

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error.data);
    })
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error.data);
    })
  })
}