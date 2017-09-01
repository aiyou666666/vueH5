<template>
  <div>
    <div v-show="loading">
      <div class="loading">
        <img src="../assets/images/loading.gif" alt="">      </div>
    </div>
    <div v-show="limits">
      <div class="background"></div>
      <div class="msgList">
        <ul>
          <li class="firstLi" @click="goPath">
            <i v-show="msg.status!=1"><img src="../assets/images/jr.png" alt=""></i>
            <div v-if="msg.status==1" class="alert"><img src="../assets/images/cg.png" alt="">提交申请</div>
            <div v-if="msg.status==1" class="name"><span class="report_name">{{process.reportRepairName}}</span><span>{{process.reportRepairDate | timeChange}}</span>
            </div>
            <div v-if="msg.status==3||msg.status==2" class="alert"><img src="../assets/images/cg.png" alt="">提交故障鉴定</div>
            <div v-if="msg.status==3||msg.status==2" class="name"><span class="report_name">{{process.identifyName}}</span><span>{{process.identifyDate |　timeChange}}</span>
            </div>
            <div v-if="msg.status==4" class="alert"><img src="../assets/images/cg.png" alt="" >提交维修报告</div>
            <div v-if="msg.status==4" class="name"><span class="report_name">{{process.repairName}}</span><span>{{process.repairDate | timeChange}}</span>
            </div>
            <div v-if="msg.status==5" class="alert"><img src="../assets/images/cg.png" alt="" class="alert">验收通过</div>
            <div v-if="msg.status==5" class="name"><span class="report_name">{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span>
            </div>
            <div v-if="msg.status==6" class="alert"><img src="../assets/images/cw.png" alt="" class="alert">验收未通过</div>
            <div v-if="msg.status==6" class="name"><span class="report_name">{{process.repairCheckName}}</span><span>{{process.repairCheckDate | timeChange}}</span>
            </div>
          </li>
          <li>
            <span>维修单号</span><span>{{msg.applyNo}}</span>
          </li>
          <li>
            <span>状态</span><span>{{msg.status | status}}</span>
          </li>
        </ul>
      </div>
      <div class="background"></div>
      <div class="msgCard">
        <img src="../assets/images/11.png" alt="" v-if="!msg.assetsImg">
        <img :src="msg.assetsImg | showImage" alt="" v-else>
        <span>
        <ul class="cardList" @click="detail">
            <li><span class="dugeText">{{msg.assetsName | machineName}}</span><span class="duge" :class="{noUrgent:msg.urgentLevel==1||msg.urgentLevel==2,Urgent:msg.urgentLevel==3,veryUrgent:msg.urgentLevel==4}">{{msg.urgentLevel | urgentLevel}}</span></li>
			<li>{{msg.assetsDeptName | applyDoneName}} <img src="../assets/images/jr.png" alt=""></li>
			<li>申请时间 {{msg.reportRepairDate | timeChange}}</li>
			</ul>
			</span>
      </div>
      <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==10" :class="{active:isActive,btn:!isActive}">返回验收列表</button-com>
      <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==3&&!this.$route.query.backIdenify" :class="{active:isActive,btn:!isActive}">返回维修列表</button-com>
      <button-com class="btnLeave" @click.native="goAccept" v-if="(msg.status==2||msg.status==4)&&!this.$route.query.flag" :class="{active:isActive,btn:!isActive}">验收
      </button-com>
      <button-com class="btnLeave" @click.native="goRepair" v-if="msg.status==3&&!this.$route.query.flag&&userInfo.authoritiesStr.indexOf('REP_APPLY_REPAIR') != -1" :class="{active:isActive,btn:!isActive}">填写维修报告单
      </button-com>
      <button-com class="btnLeave" @click.native="goRepairother" v-if="this.$route.query.flag==1&&this.$route.query.localhost==1&&userInfo.authoritiesStr.indexOf('REP_APPLY_REPAIR') != -1" :class="{active:isActive,btn:!isActive}">填写维修报告单
      </button-com>
      <div style="text-align: center"><button class="otherBtn" @click="goListother" v-if="this.$route.query.flag==1&&this.$route.query.localhost==1" :class="{ current: isCurrent}">返回故障鉴定列表</button></div>
      <button-com class="btnLeave" @click.native="goList" v-if="this.$route.query.flag==1&&this.$route.query.localhost==0||this.$route.query.backIdenify==1" :class="{active:isActive,btn:!isActive}">返回故障鉴定列表</button-com>
      <button-com class="btnLeave" @click.native="goIdenfy" v-if="msg.status==1&&this.$route.query.newApply!=1" :class="{active:isActive,btn:!isActive}">故障鉴定</button-com>
      <button-com class="btnLeave" @click.native="goHome" v-if="this.$route.query.newApply==1" :class="{active:isActive,btn:!isActive}">返回首页</button-com>
    </div>
    <div v-show="nolimits">
      <div class="noresult">
        <img src="../assets/images/noresult.png" alt="">
        <div>没有权限</div>
      </div>
    </div>
  </div>

</template>
<script>
	import Vue from 'vue'
	import api from '../service/api.js'
	import ButtonCom from '../components/Button'
	export default {
		created() {
				//      说明已读消息
				if(this.$route.query.msgId) {
					api.getReadMsg({
						method: 'get',
						data: {
							messageid: this.$route.query.msgId
						},
						_this: this,
						headers: {
							'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
						}
					}).then(response => {
//					  已读之后调一次消息总个数的接口

          })
				}
        let _this=this
				api.getDetail({
//          callBack:function(res){
//            if(res.code==403){
//              _this.nolimits=true
//            }else{
//              _this.limits=true
//            }
//          },
					param: {
						id: this.$route.query.id
					},
					_this: this,
					headers: {
						'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
					},
					method: 'get'
				}).then(response => {
					this.msg = response
				})
				api.getProcess({
					param: {
						id: this.$route.query.id
					},
					_this: this,
					headers: {
						'X-AEK56-Token': Vue.ls.get("X-AEK56-Token")
					},
					method: 'get'
				}).then(response => {
					this.process = response
          setTimeout(()=>{
            this.loading=false
            if(this.userInfo.authoritiesStr.indexOf('REP_APPLY_DETAILED_VIEW') != -1){
              this.limits=true
            }else{
              this.nolimits=true
            }
          },1000)
				})
      document.title='维修单详情'
      if(this.$route.query.newApply==1){
        document.title="维修申请"
      }
      if(this.$route.query.flag==3&&!this.$route.query.backIdenify){
        document.title="维修完成"
      }
      if(this.$route.query.flag==1&&this.$route.query.localhost==1){
        document.title="故障鉴定完成"
      }
      if(this.$route.query.flag==1&&this.$route.query.localhost==0){
        document.title="故障鉴定完成"
      }
      if(this.$route.query.flag==10){
        document.title='验收完成'
      }
			},
			data() {
				return {
				  loading:true,
				  limits:false,
          nolimits:false,
          hasID:true,
					msg: '',
					process: '',
					userInfo: Vue.ls.get("useInfo"),
					isActive: false,
					isCurrent: false
				}
			},
			components: {
				ButtonCom
			},
			methods: {
				goHome() {
					this.isActive = true
					this.$router.push('/tabbar')
				},
				detail() {
					this.isActive = true
					this.$router.push({
						path: '/deviceDetail',
						query: {
							id: this.$route.query.id
						}
					})
				},
				goIdenfy() {
					this.isActive = true
					this.$router.push({
						path: '/idenify',
						query: {
							id: this.$route.query.id
						}
					})
				},
				goList() {
					this.isActive = true
					this.isCurrent = true
					this.$router.push({
						path: '/deviceList',
						query: {
							status: this.$route.query.flag
						}
					})
				},
				goListother() {
					this.isCurrent = true
					this.$router.push({
						path: '/deviceList',
						query: {
							status: this.$route.query.flag
						}
					})
				},
				goPath() {
					if(this.msg.status != 1) {
						this.isActive = true
						this.$router.push({
							path: '/pathDetail',
							query: {
								id: this.$route.query.id
							}
						})
					} else {

					}
				},
				goRepair() {
					this.isActive = true
					this.$router.push({
						path: '/repairReport',
						query: {
							id: this.$route.query.id
						}
					})
				},
				goAccept() {
					this.isActive = true
					this.$router.push({
						path: '/accept',
						query: {
							id: this.$route.query.id,
							status: this.msg.status
						}
					})
				},
				goHome() {
					this.isActive = true
					this.$router.push('/home')
				},
				goRepairother() {
					this.isActive = true
					this.$router.push({
						path: '/repairReport',
						query: {
							id: this.$route.query.id,
							other: 1
						}
					})
				}
			}
	}
</script>
<style scoped lang="scss">
	@import "../assets/scss/reset.scss";
	@import "../assets/scss/my-mixin.scss";
	.background {
		height: pxToRem(20px);
		background: #eff3f6;
	}

	.msgList .firstLi {
		font-size: pxToRem(32px);
	}

	.msgList {
		color: #333;
		font-size: pxToRem(32px);
		@include MsgList();
	}

	.msgList .name {
		font-size: pxToRem(28px);
	}

	.msgList li:last-child {
		border-bottom: 0;
	}

	.msgList li span {
		display: inline-block;
		font-size: pxToRem(28px);
	}

	.msgList li div.alert {
		font-size: pxToRem(32px);
	}

	.msgList li.firstLi {
		height: pxToRem(140px);
		font-size: pxToRem(28px);
	}

	.msgList li.firstLi div:last-child {
		height: pxToRem(60px);
		color: #666;
		line-height: pxToRem(50px);
		span.report_name {
			max-width: pxToRem(380px);
			word-wrap: normal;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			vertical-align: middle;
		}
	}

	.msgList li.firstLi div:first-child {
		height: pxToRem(80px);
		font-size: pxToRem(32px);
		line-height: pxToRem(90px);
		color: #333;
	}

	.firstLi img {
		height: pxToRem(25px);
		width: pxToRem(25px);
		margin-right: pxToRem(25px);
	}

	.firstLi> i {
		float: right;
		margin-top: pxToRem(20px);
		img {
			width: pxToRem(14px);
			height: pxToRem(31px);
		}
	}

	.msgList li span {
		display: inline-block;
		margin-right: pxToRem(25px);
		color: #666;
	}

	.msgList li> span:first-child {
		width: pxToRem(165px);
		color: #333;
	}

	.msgCard {
		height: pxToRem(210px);
		background: #fff;
		padding: pxToRem(32px);
		margin-bottom: pxToRem(60px);
	}

	.msgCard> img {
		width: pxToRem(151px);
		height: pxToRem(151px);
		float: left;
		margin-right: pxToRem(32px);
	}

	.cardList li {
		margin-bottom: pxToRem(17px);
	}

	.cardList li:first-child {
		font-size: pxToRem(32px);
		color: #333;
	}

	.cardList li:nth-child(2) {
		color: #666;
		img {
			width: pxToRem(14px);
			height: pxToRem(31px);
			float: right;
		}
	}

	.cardList li:last-child {
		color: #999;
	}
.dugeText{
  /*line-height: pxToRem(36px);*/
}
	.duge {
		height: pxToRem(40px);
		line-height: pxToRem(40px);
		/*float: right;*/
    margin-left: pxToRem(30px);
		display: inline-block;
		font-size: pxToRem(20px);
		text-align: center;
		color: #fff;
		border-radius: 15px;
		width: pxToRem(120px);
		padding-top: pxToRem(2px);
    margin-top: pxToRem(2px);
	}

	.cardList .veryUrgent {
		background: #f3756f;
	}

	.cardList .Urgent {
		background: #f7931e;
	}

	.cardList .noUrgent {
		background: #63bd90;
	}

	.otherBtn {
		font-size: pxToRem(32px);
		color: #f7931e;
		border: 1px solid #f7931e;
		background: #eff3f6;
		width: pxToRem(680px);
		margin-bottom: pxToRem(30px);
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 3px;
		margin: 0 auto;
	}

	.current {
		color: #faae5c;
		border: 1px solid #faae5c;
	}
</style>
