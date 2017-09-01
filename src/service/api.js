	import axios from 'axios'
	import qs from 'qs'
	import { Toast } from 'mint-ui'
	import Vue from 'vue'
	import VueLocalStorage from 'vue-ls'

	Vue.config.productionTip = false
	let options = {
	  namespace: 'vuejs__'
	};
	let _this=null;
	Vue.use(VueLocalStorage, options);
	// axios 配置
	axios.defaults.timeout = 5000;

	axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
	//axios拦截器  POST传参序列化
	axios.interceptors.request.use((config) => {
		//var currModule=  config.url.split("/")[1];
		//config.url = ( currModule=='api_v3' || currModule=='getsignature') ? "/api" + config.url: "/api/" +currModule+ config.url;
		if(config.isLogin!='noNeed'){
			 config.headers['X-AEK56-Token']=Vue.ls.get("X-AEK56-Token") && (axios.defaults.headers.common['X-AEK56-Token'] = Vue.ls.get("X-AEK56-Token") || '') //设置统一的token
		}else{
		   config.headers['X-AEK56-Token']='';
		}

		config.url= config.url.indexOf("api")!=-1 ? config.url : "/api"+config.url

		if(config.method === 'post') {
			//config.data = qs.stringify(config.data);     //以表单(FormData)的形式提交
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
	  if(res.data.code==401){
	  	_this.$router.push('/')
        return;

    }else if(res.data.code==302){
    	this.a.getPermissionList({
    	  callBack:function (data) {

          Vue.ls.set("useInfo",data);
          _this.$router.go(0);
        }
      })

    	return;
    }
		return Promise.reject(res);
	}

		return res;
	}, (error) => {
	Toast({
      message: '网络故障，请检查网络重试',
      position: 'center',
      duration: 1500
    });
		return Promise.reject(error);
	});

	export function fetch(url, params) {
		return new Promise((resolve, reject) => {
			 axios({
			 	url:url,
			 	method:(params && params.method) || 'post',
			 	data: params && params.data,
			 	isLogin:params && params.noToken,
			 	headers: (params && params.headers) || axios.defaults.headers
			 }).then(response => {
			 	     params.callBack && params.callBack(response.data)
					resolve(response.data.data || response.data)
				}, err => {
					if(err.data.code==450){

		          	 Vue.ls.clear()
		          	 Toast({
						message:"token失效,请重新登录",
						position: 'center',
						duration: 1500
                      })
		          	 _this.$router.push('/')
		          }else{
		          	if(!params.isApply &&params.isApply!='isApply'&&err.data.code!=403){
		          	Toast({
						message:err.data.msg,
						position: 'center',
						duration: 1500
                      })
		          	}


		          }

				   params.callBack && params.callBack(err.data)
                 //非法token

				}).catch((error) => {
					params.callBack && params.callBack(error)
                // 提交失败，请检查网络重试
				});
		})
	}

	export default {
		/**
		 * 用户登录
		 * @param{username,deviceId,password}
		 */
		Login(params) {
			_this=params._this;
			return fetch('/oauth/auth', params)
		},
		/*
		 * 退出登录
		 */
		 loginOut(params){
		 	_this=params._this;
		 	return fetch('/oauth/logout-success',params)
		 },
		/*
		 * 重置密码  获取短信验证码
		 * @param{account}
		 */
		getCaptcha(params){
			_this=params._this;
			return fetch('/sys/index/sendCode',params)
		},
		/*
		 *短信登录 获取验证码
		 * @param{mobile,deviceId}
		 */

		getMsgCaptcha(params){
			_this=params._this;

			return fetch('/oauth/sendLoginPwd',params)
		},
		/*
		 * 重置密码
		 * @param{account,code,password}
		 */
		resetPassword(params){
			_this=params._this;
			return fetch('/sys/index/resetPassword',params)
		},
		/*
		 * 获取权限列表 以及登录用户的基本信息
		 * @param{}
		 */
		getPermissionList(params){
			//_this=params._this;
		   return fetch('/oauth/cache/permission/list',params)
		},
		/*
		 *获取各种状态的列表（除了带验收的）
		 * @param{orderByField,isAsc}
		 */
		getMsgList(params){
			_this=params._this;
		  return fetch('/repair/apply/search',params)
        },
    /*
     *获取主页上待验收的列表
     * @param{}
     */
    getacceptMsgList(params){
    	_this=params._this;
      return fetch('/repair/apply/search3',params)
    },
    /*
     *获取申请单的详细信息
     * @param{}
     */
    getDetail(params){
    	_this=params._this;
      return fetch('/repair/apply/search/'+params.param.id,params)
    },
    /*
     *查看流程
     * @param{}
     */
    getProcess(params){
    	_this=params._this;
      return fetch('/repair/apply/getApplyDetails/'+params.param.id,params)
    },
    /*
     *故障鉴定
     * @param{}
     */
    idenify(params){
    	_this=params._this;
      return fetch('/repair/repRepairAppraisal/appraisal',params)
    },
    /*
     *填写维修报告单
     * @param{}
     */
    writeReport(params){
    	_this=params._this;
      return fetch('/repair/repRepairReport/save',params)
    },
    /*
     *查看维修报告单
     * @param{}
     */
    lookReport(params){
    	_this=params._this;
      return fetch('/repair/repRepairReport/search/'+params.param.id,params)
    },
    /*
     *关联字典表
     * @param{}
     */
    lookDictionary(params){
    	_this=params._this;
      return fetch('/repair/repairDictionary/search/'+params.param.id,params)
    },
    /*
     *根据key查看字典表
     * @param{}
     */
    keyDictionary(params){
    	_this=params._this;
      return fetch('/repair/repairDictionary/selectkey/'+params.param.key,params)
    },
    /*
     *填写验收单
     * @param{}
     */
    writeAccept(params){
    	_this=params._this;
      return fetch('/repair/repRepairCheck/check',params)
    },
    /*
     *查询未读消息数量
     * @param{}
     */
    msgNumfind(params){
    	_this=params._this;
      return fetch('/repair/repMessageReceive/find',params)
  },
    /*
     *查询状态的数量
     * @param{}
     */
    statusNum(params){
    	_this=params._this;
      return fetch('/repair/apply/total/'+params.param.id,params)
    },
    /*
     *查询消息列表
     * @param{}
     */
    messageList(params){
    	_this=params._this;
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
    	_this=params._this;
      return fetch('/repair/apply/add',params)
    },
    /*
     * 获取设备详情
     * @param {id}
     */
    getDeviceDetail(params){
    	_this=params._this;
    	return fetch('/assets/assetsInfo/getAssetsDetail',params)
    },
    /*
     *上传图片
     * @params{files}
     */
     uplopadImg(params){
     	_this=params._this;
     	 return fetch('/upload/upload'+params.params.id,params)
     },
    /*
     * 已读消息
     * @param {id}
     */
    getReadMsg(params){
    	_this=params._this;
      return fetch('/repair/repMessageReceive/read',params)
    },
    /*
     * 用户详情
     * @param {id}
     */
    getUserDetail(params){
    	_this=params._this;
      return fetch('/sys/user/'+params.param.id,params)
    }

}

