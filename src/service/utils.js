

	export function setRandom() {
	
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	
	}
	
	export default {
	
		/**
		 * 生成设备唯一标识
		 */
		getDeviceUnqinId() {
			return(setRandom() + setRandom() + "-" +setRandom() + "-" + setRandom() + "-" + setRandom() + "-" + setRandom() + setRandom() + setRandom());
		},
		/*
		 *校验邮箱
		 * @param {String} agr1
         * @return {boolean} flag
		 */
		isEmail(text){
			var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(text);
			
		},
		/*
		 * 检测是否是手机号
		 * @param {String}
		 * @return {boolean} flag
		 */
		isTelphone(text){
			var reg = /^(1[3-8][0-9])\d{8}$/;
            return reg.test(text);
			
		}
	}