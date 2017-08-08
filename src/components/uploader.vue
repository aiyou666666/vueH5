<template>
 <div class="bigDiv">
    <div class="vue-uploader">
        <div class="file-list file-wrap file-padding" >
            <section v-for="(file, index) of files" @click="previewImg(index)" class="file-item imgItem draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <!--<span class="file-remove" @click="remove(index)">+</span>-->
            </section>
        	 <section class="file-item" v-if="showAdd">
                <div class="add">
                   <img src="../assets/images/tjtp.png" />
                   <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
                </div>
            </section>
        </div>
    </div>
</div>
</template>
<script>
  import Vue from 'vue'
  import api from '../service/api.js'
  import wxInit  from  '../wechat/weixin.js'
  import wx from 'weixin-js-sdk'
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            imgArr:{
            	type:Array
            },
            urgentLevel:{
              type: String,
            },
            faultDesc:{
              type: String,
            }
        },
        data() {
            return {
                status: 'ready',
                files: Vue.ls.get("files"),
//                files: [],
                point: {},
                uploading: false,
                percent: 0,
                isShowPre:false,
                showAdd:true
            }
        },
        methods: {
          /*  add() {
            	console.log("添加图片");
            	console.log(this.$refs);
                this.$refs.file.click()
            },*/
            submit() {
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append("files", item.file)
                })
                const xhr = new XMLHttpRequest()
                xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', this.src, true)
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        this.imgArr.push(JSON.parse(xhr.response).data[0])
                        this.$set(this, 'list', this.imgArr)
                        console.log('upload success!')
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)

                        this.files.push(item)
                    }
                }

                this.$refs.file.value = ''
                this.submit()
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            previewImg(index){
              Vue.ls.set("urgentLevel",this.urgentLevel)
              Vue.ls.set("faultDesc",this.faultDesc)
              this.$router.push({ path: '/lookBigpircture', query: { index: index }})
            },
            uploadProgress(evt) {
                const component = this
                if (evt.lengthComputable) {
                    const percentComplete = Math.round((evt.loaded * 100) / evt.total)
                    component.percent = percentComplete / 100
                } else {
                    console.warn('upload progress unable to compute')
                }
            }
        },
      watch:{
        files: function (val) {
          if(val.length>=5){
            this.showAdd=false
          }
          Vue.ls.set("files",val)
        }
      }
    }
</script>
<style scoped lang="scss">
@import "../assets/scss/reset.scss";
@import "../assets/scss/my-mixin.scss";
.bigDiv{
  width: 75%;
  margin-left: 25%;
}
.vue-uploader {
    /*border: 1px solid #e5e5e5;*/
   width:pxTORem(300px) ;
}
/*.vue-uploader .file-list {*/
   /*float: left;*/
/*}*/
.vue-uploader .file-list {
   margin-left:pxTORem(30px)  ;
 }
.vue-uploader .chooseImg{
	float: left;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    display: inline-block;
    /*position: relative;*/
    width:pxToRem(150px);
    text-align: center;
    height: pxToRem(150px);
}
.vue-uploader .file-list .imgItem{
	margin-right:pxToRem(20px);
	margin-bottom:pxToRem(20px) ;
}
.vue-uploader .file-list .file-item img{
	width:100%;
	height:100%;
}
.vue-uploader .chooseImg .file-item img{
    width: pxToRem(150px);
    height: pxToRem(150px);
   /* border: 1px solid #ececec;*/
}
.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right:pxToRem(12px);
    display: none;
    top: pxToRem(4px);
    width: pxToRem(14px);
    height: pxToRem(14px);
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: pxToRem(40px);
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    width:  pxToRem(150px);
    height: pxToRem(150px);
    /*margin-left: 10px;*/
    float: left;
    text-align: center;
    line-height:pxToRem(80px);
    /*border: 1px dashed #ececec;*/
    font-size: 30px;
    cursor: pointer;
    position: relative;
    input[type='file']{
    	position: absolute;
    	width:100%;
    	height: 100%;
    	top: 0;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	opacity: 0;
    }
}



.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
.bigImgWrap{
	position:fixed;
	background-color: #000;
	top:0;
	left:0;
	right:0;
	bottom: 0;
	z-index:100;
}
</style>
