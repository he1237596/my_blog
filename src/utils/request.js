import axios from 'axios';
import { Message, Loading } from 'element-ui';
import { getStore } from './utils';
import router from '../router';
//let loading        //定义loading变量
//
//function startLoading() {    //使用Element loading-start 方法
//  loading = Loading.service({
//      lock: true,
//      text: '加载中……',
//      background: 'rgba(0, 0, 0, 0.7)'
//  })
//}
//function endLoading() {    //使用Element loading-close 方法
//  loading.close()
//}
//let needLoadingRequestCount = 0
//export function showFullScreenLoading() {
//  if (needLoadingRequestCount === 0) {
//      startLoading()
//  }
//  needLoadingRequestCount++
//}
//
//export function tryHideFullScreenLoading() {
//  if (needLoadingRequestCount <= 0) return
//  needLoadingRequestCount--
//  if (needLoadingRequestCount === 0) {
//      endLoading()
//  }
//}

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
//axios.defaults.headers.post['SessionId'] = 'sss';
var version = "1.0.0";
var timestamp = Date.parse(new Date()) / 1000;

//http request 拦截器
axios.interceptors.request.use(
	config => {
		// const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
		//  config.data = JSON.stringify(config.data);
		//  config.headers = {
		//    'Content-Type':'application/x-www-form-urlencoded'
		//  }
		// if(token){
		//   config.params = {'token':token}
		// }
		//  const userInfo = getStore('userInfo');
		//  if(userInfo){
		//  	const {id} =JSON.parse(userInfo);
		//  	config.headers.common['sessionId'] = id;
		//  }
		//showFullScreenLoading()
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
const $http = axios.create()
//http response 拦截器
axios.interceptors.response.use(
	response => {
		//未登录
		if (response.data.code == 405) {
			router.push({
				path: "/login",
				querry: {
					redirect: router.currentRoute.fullPath
				} //从哪个页面跳转
			})
		}
		//tryHideFullScreenLoading()
		return response;
	},
	error => {

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(`readyState: ${error.request.readyState}`);
			console.log(`status: ${error.request.status}`);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}

		return Promise.reject(error)
	}
)

export default {
	get: function (url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: params
			})
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	post: function (url, param = {}, isFile = false) {
		//		Message.loading({
		//			mask: true,
		//			message: '请稍候...',
		//			duration: 0,
		//			forbidClick: true,
		//			mask: false
		//		});

		const data = JSON.stringify(param);

		//		var data = {
		//			bizContent: param,
		//			sign: util.makeSign(param, timestamp, version),
		//			timestamp: timestamp,
		//			version: version
		//		}
		return new Promise((resolve, reject) => {
			if (isFile) {
				// $http.defaults.headers.post['Content-Type'] = 'multipart/form-data';
				$http.post(url, param, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
					.then(response => {
						//					Toast.clear();
						resolve(response.data);
					})
					.catch(err => {
						reject(err)
					})
			} else {
				// $http.defaults.headers.post['Content-Type'] = 'application/json';
				axios.post(url, data)
					.then(response => {
						//					Toast.clear();
						resolve(response.data);
					})
					.catch(err => {
						reject(err)
					})
			}
		})
	},
	patch: function (url, data = {}) {
		return new Promise((resolve, reject) => {
			axios.patch(url, data)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	put: function (url, data = {}) {
		return new Promise((resolve, reject) => {
			axios.put(url, data)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}