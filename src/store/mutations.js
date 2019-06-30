import {
	login,
	signup
} from '../service/user'
import {setStore, getStore} from '../utils/utils'
import {
	GET_USERINFO,
	SAVE_USERINFO
} from './mutation-types.js'

export default {
//取VUEX
	[GET_USERINFO](state, userInfo) {

			if(!userInfo){
				state.userInfo = getStore('userInfo')?JSON.parse(getStore('userInfo')):{};
			}else{
				state.userInfo = userInfo;
			}
	},
	//设置缓存
	[SAVE_USERINFO](state, userInfo){
		setStore('userInfo',userInfo)
		state.userInfo = userInfo;
	}
}