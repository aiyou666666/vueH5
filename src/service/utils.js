

	export function setRandom() {
	
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	
	}
	
	export default {
	
		/**
		 * 生成设备唯一标识
		 */
		getDeviceUnqinId() {
			return(setRandom() + setRandom() + "-" +setRandom() + "-" + setRandom() + "-" + setRandom() + "-" + setRandom() + setRandom() + setRandom());
		}
	}