	import axios from 'axios'
	import qs from 'qs'
	import { Toast } from 'mint-ui'
	import Vue from 'vue'
	import VueLocalStorage from 'vue-ls'
	Vue.config.productionTip = false
	let options = {
	  namespace: 'vuejs__'
	};
	Vue.use(VueLocalStorage, options);

	// axios 配置

	axios.defaults.timeout = 5000
	axios.defaults.headers.common['X-AEK56-Token'] = Vue.ls.get("X-AEK56-Token") || '' //设置统一的token
	axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
	//axios拦截器  POST传参序列化
	axios.interceptors.request.use((config) => {

		config.url="/api"+config.url
		if(config.method === 'post') {
			//config.data = qs.stringify(config.data);     //不需要序列化
		}else if(config.method==='get'){
			config.params=config.data
		}

		return config;
	}, (error) => {
		Toast({
			message: '错误的传参',
			position: 'center',
			duration: 1500
		});
		return Promise.reject(error);
	});

	//返回状态判断
	axios.interceptors.response.use((res) => {
	//获取权限列表的的时候 成功状态 没有code 这里先做特殊处理

	if(res.data.code!=200 && !res.data.id) {
		return Promise.reject(res);
	}

		return res;
	}, (error) => {
		// Toast({
		// 	message: '网络异常',
		// 	position: 'center',
		// 	duration: 1500
		// });
    this.popupVisible2 = true
		return Promise.reject(error);
	});

	export function fetch(url, params) {

		return new Promise((resolve, reject) => {
			 axios({
			 	url:url,
			 	method:(params && params.method) || 'post',
			 	data: params && params.data,
			 	headers:(params && params.headers) || axios.defaults.headers
			 }).then(response => {
					resolve(response.data.data || response.data)
				}, err => {
					Toast({
						message: err.data.msg,
						position: 'center',
						duration: 1500

		          })
				  //非法token
		          if(res.data.code==450){

		          }
				}).catch((error) => {

				});
		})
	}
	export default {
		/**
		 * 用户登录
		 * @param{username,deviceId,password}
		 */
		Login(params) {
			return fetch('/api_v3/auth', params)
		},
		/*
		 * 退出登录
		 */
		 loginOut(params){
		 	return fetch('/api_v3/logout-success',params)
		 },
		/*
		 * 重置密码  获取短信验证码
		 * @param{account}
		 */
		getCaptcha(params){
			return fetch('/sys/index/sendCode/',params)
		},
		/*
		 *短信登录 获取验证码
		 * @param{mobile,deviceId}
		 */

		getMsgCaptcha(params){

			return fetch('/api_v3/sendLoginPwd',params)
		},
		/*
		 * 重置密码
		 * @param{account,code,password}
		 */
		resetPassword(params){
			return fetch('/sys/index/resetPassword',params)
		},
		/*
		 * 获取权限列表 以及登录用户的基本信息
		 * @param{}
		 */
		getPermissionList(params){
		   return fetch('/api_v3/cache/permission/list',params)
		},
		/*
		 *获取各种状态的列表（除了带验收的）
		 * @param{orderByField,isAsc}
		 */
		getMsgList(params){
		  return fetch('/repair/apply/search',params)
        },
    /*
     *获取主页上待验收的列表
     * @param{}
     */
    getacceptMsgList(params){
      return fetch('/repair/apply/search3',params)
    },
    /*
     *获取申请单的详细信息
     * @param{}
     */
    getDetail(params){
      return fetch('/repair/apply/search/'+params.param.id,params)
    },
    /*
     *查看流程
     * @param{}
     */
    getProcess(params){
      return fetch('/repair/apply/getApplyDetails/'+params.param.id,params)
    },
    /*
     *故障鉴定
     * @param{}
     */
    idenify(params){
      return fetch('/repair/repRepairAppraisal/appraisal',params)
    },
    /*
     *填写维修报告单
     * @param{}
     */
    writeReport(params){
      return fetch('/repair/repRepairReport/save',params)
    },
    /*
     *查看维修报告单
     * @param{}
     */
    lookReport(params){
      return fetch('/repair/repRepairReport/search/'+params.param.id,params)
    },
    /*
     *关联字典表
     * @param{}
     */
    lookDictionary(params){
      return fetch('/repair/repairDictionary/search/'+params.param.id,params)
    },
    /*
     *根据key查看字典表
     * @param{}
     */
    keyDictionary(params){
      return fetch('/repair/repairDictionary/selectkey/'+params.param.key,params)
    },
    /*
     *填写验收单
     * @param{}
     */
    writeAccept(params){
      return fetch('/repair/repRepairCheck/check',params)
    },
    /*
     *查询未读消息数量
     * @param{}
     */
    msgNum(params){
      return fetch('/repair/repMessageReceive/find',params)
  },
    /*
     *查询状态的数量
     * @param{}
     */
    statusNum(params){
      return fetch('/repair/apply/total/'+params.params.id,params)
    },
    /*
     *查询消息列表
     * @param{}
     */
    messageList(params){
      return fetch('/repair/repMessageReceive/search',params)
    },
		/*
		 * 获取微信的token、签名
		 *
		 */
		getWeiChatToken(params){
		  return fetch('/getsignature',params)
		},
    /*
     * 新建维修申请
     *
     */
    newApply(params){
      return fetch('/repair/apply/add',params)
    },
    /*
     * 获取设备详情
     * @param {id}
     */
    getDeviceDetail(params){
    	return fetch('/assets/pmAssetsInfo/getAssetsDetail',params)	
    } 
    
	}

