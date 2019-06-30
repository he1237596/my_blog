import request from '../utils/request'
//import {getStore} from '../config/mUtils'

//注册
export const signup = data => request.post('/signup', data);
/**
   * 账号密码登录
   */
export const login = data => request.post('/login', data);

/**
   * 退出登录
   */
export const logout = () => request.get('/logout');

/*
 * 获取用户信息
 */
export const getUser = () => request.post('/getUser');

/*
 * 修改用户信息
 */
export const updateUser = data => request.post('/updateUser',data);

///**
// * 获取用户信息
// */
//
//export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
//
//
///**
// * 手机号登录
// */
//
//var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
//	code,
//	mobile,
//	validate_token
//}, 'POST');
//
//
///**
// * 获取订单列表
// */
//
//export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
//	limit: 10,
//	offset,
//});
//
//
///**
// * 获取订单详情
// */
//
//export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');
//
//
///**
//*个人中心里编辑地址
//*/
//
//export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')
//
///**
//*个人中心里搜索地址
//*/
//
//export const getSearchAddress = (keyword) => fetch('v1/pois',{
//	keyword:keyword,
//	type:'nearby'
//})
//
///**
//* 删除地址
//*/
//
//export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')
//
//
//
///**
// * 账号密码登录
// */
//export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');
//
//
///**
// * 退出登录
// */
//export const signout = () => fetch('/v2/signout');
//
//
///**
// * 改密码
// */
//export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
