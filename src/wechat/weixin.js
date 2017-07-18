import wx from 'weixin-js-sdk'
import axios from 'axios'
import api from '../service/api.js'
export default {
	created(fn) {
		api.getWeiChatToken({
			data: {
				url: location.href.split('#')[0] // 将当前URL地址上传至服务器用于产生数字签名			    
			}
		}).then(response => {
			wx.config({
				debug: true,
				appId: response.appId,
				timestamp: response.timestamp,
				nonceStr: response.nonceStr,
				signature: response.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'onVoicePlayEnd',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'
				]
			})
			wx.ready(function(res){
				fn && fn(res)	
			})
			wx.error(function(res) {
				/*报错就再次调用api获取wx token*/
				

			})

		})

	}

}