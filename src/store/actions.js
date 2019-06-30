import {
	login,
	signup,
	getUser
} from '../service/user'
import {
	GET_USERINFO,
	SAVE_USERINFO
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		console.log(res.data)
		commit(GET_USERINFO, res.data)
		commit(SAVE_USERINFO, res.data)
	},
	
//	async saveAddress({
//		commit,
//		state
//	}) {
//
//		if(state.removeAddress.length > 0) return;
//
//		let addres = await getAddressList(state.userInfo.user_id);
//		commit(SAVE_ADDRESS, addres);	
//	},
}