<template>
    <div>
        <group-title slot="title">附件
        </group-title>
        <div class="uploadFile_files_list">
            <div class="uploadFile_files" style="justify-content: space-between;"   v-for="(item, index) in fileList" v-if="(!item.isDelete && item.type.indexOf('pdf')>-1)"  :key="index">
                <div @click="showDetail(index)">
                    <img class="uploadFile_file_pdf" :src="pdfIcon">
                    {{item.name}}
                </div>
                <div class="uploadFile_files-right">
                    <span v-show="!item.status" class="uploadFile_file_pdf_status"> 上传{{item.loadLength}}%</span>
                    <span v-show="item.status" class="uploadFile_file_pdf_status uploading">上传成功</span>
                    <img class="uploadFile_file_pdf_delete" :src="fileDeleteIcon" @click="deleteItem(index)">
                </div>
            </div>
        </div>
        <div class="uploadFile_imgs_list">
            <div class="uploadFile_imgs"  v-if="(!item.isDelete && item.type.indexOf('image')>-1 || item.type.indexOf('video')>-1)" v-for="(item, index) in fileList" :key="index">
                <img class="uploadFile_file_delete" :src="fileDeleteIcon" @click="deleteItem(index)">
                <span v-show="!item.status" class="uploadFile_file_status"> 上传{{item.loadLength}}%</span>
                <span v-show="item.status" class="uploadFile_file_status uploading">上传成功</span>
                <img v-if="item.type.indexOf('image')>-1" class="uploadFile_img" :src="item.msrc" @click="show(index)">
                <video preload="auto"  v-if="item.type.indexOf('video')>-1" class="uploadFile_img" :src="item.msrc" @click="show(index)" />
            </div>
            <div class="uploadFile_imgs" style="margin-bottom: 10px;margin-left: 11px;">
                <img  v-show="isuploadFile" class="uploadFile_img" :src="uploadFileIcon" @click="addImgs">
            </div>
            <div v-transfer-dom>
                <previewer @on-close="closePre" :list="imgsFiles" ref="previewer" @on-index-change="logIndexChange"></previewer>
            </div>
        </div>
    </div>
</template>
<script>

import GroupTitle from "vux/src/components/group-title"
import TransferDom from 'vux/src/directives/transfer-dom'
import Previewer from 'vux/src/components/previewer'

import $ from "jquery";
import axios from "axios";
import uploadFileIcon from "Assets/images/addCommand.png";
import fileDeleteIcon from "Assets/images/file_delete.png";
import pdfIcon from "Assets/images/pdf.png";
import { FILE_PATH as serverPath  } from 'Config/index';

let hasShowPreviewer = false;

export default {
    data() {
        return {
            uploadFileIcon: uploadFileIcon,
            fileDeleteIcon:fileDeleteIcon,
            pdfIcon:pdfIcon,
            MAX_IMG_LENGTH: 10, // 最大上传图片数
            fileList:[],//上传的文件
            imgsFiles:[],//图片
            addIMGFile: undefined,
            isuploadFile:true,
            attachments:[],
            typeArr:[{type:"image/*",name:"image"}, {type:"video/*",name:"video"}],//上传类型
        }
    },
    props: ["children"],
    components: {
        GroupTitle,
        TransferDom,
        Previewer
    },
    directives: {
        TransferDom
    },
    created() {
        this.addIMGFile = document.createElement("input");
        this.addIMGFile.type = "file";
        let fileType = "";
        if(this.children.typeArr){
            this.typeArr = this.children.typeArr;

        }else{
            this.typeArr = [{type:"image/*",name:"image"}, {type:"video/*",name:"video"}];
        }
        this.addIMGFile.accept = this.fileTypeModify();
        this.addIMGFile.multiple = "multiple";
        this.addIMGFile.onchange = this.addIMGFileEvt.bind(this);
        hasShowPreviewer &&
            this.$refs.previewer &&
            this.$refs.previewer.close();
    },
    watch: {
        attachments: function(newQuestion, oldQuestion) {
            if(this.attachments&&this.attachments.length>=this.MAX_IMG_LENGTH){
                this.isuploadFile = false;
            }else{
                this.isuploadFile = true;
            }
            this.publishData();
            this.refreshImgPre();
        },
        children:function(newQuestion, oldQuestion){
            if(JSON.stringify(newQuestion) != JSON.stringify(oldQuestion)){
                this.fileList=[];
                this.imgsFiles=[];
                this.attachments=[];
                this.isuploadFile=true;
            }
        }
    },
    methods: {
        fileTypeModify(){
            var fileType = "";
            for(var i=0,ilen=this.typeArr.length;i<ilen;i++){
                var type = this.typeArr[i].type;
                fileType+=type;
                if(i!=ilen-1){
                    fileType+=",";
                }
                var reg = new RegExp(/\*/);
                this.typeArr[i].type= type.replace(reg,""); 
            }
            return fileType;
        },
        showDetail(index){
            
        },
        //返回上传成功得oss数组，和是否全部上传完毕的状态
        publishData(){
            var count = 0;
            for(var i = 0,ilen = this.fileList.length;i<ilen;i++){
                if(!this.fileList[i].isDelete){
                    count++;
                }
            }
            var status = true;
            if(count>this.attachments.length){
                status = false;
            }
            this.$emit("fileUploads",this.attachments,status);
        },
        refreshImgPre(){
            this.imgsFiles = [];
            for(var i = 0,ilen = this.fileList.length;i<ilen;i++){
                if(!this.fileList[i].isDelete&&this.fileList[i].type.indexOf("image")>-1){
                    this.imgsFiles.push(this.fileList[i]);
                }
            }
        },
        closePre() {
            if ($(this.$refs.previewer).find(".pswp--open").length > 0) {
                $(this.$refs.previewer)
                    .find(".pswp--open")
                    .removeClass("pswp--open");
            }
        },
        addImgs() {
            this.addIMGFile.click();
        },
        show(index) {
            hasShowPreviewer = true;
            this.$refs.previewer.show(index);
        },
        logIndexChange(arg) {

        },
        deleteItem(index) {
            this.fileList[index].isDelete = true;
            if (this.fileList[index].status) {
                let url = this.fileList[index].ossPath;
                let position = this.checkIndex(url,this.attachments);
                (position!=-1)&&this.attachments.splice(position, 1);
            }
            if(!this.isflowApprove) this.isflowApprove =true;
        },
        checkIndex(content,arr){
            let position = -1;
            for(let i=0,ilen=arr.length;i<ilen;i++){
                if(arr[i] == content){
                    position = i;
                    break;
                }
            }
            return position;
        },
        addIMGFileEvt() {
            var files = this.addIMGFile.files;
            var fileArr = [];
            var length = this._getAddFileIMGMaxLength();
            if(files.length>length){
                this.isFail = true;
                this.failMessage = "附件最大数量为10张！";
            }
            if(files.length>=length)this.isflowApprove = false;
            var maxLength = Math.min.apply(null, [length, files.length]);
            for (var i = 0; i < maxLength; i++) {
                var file = files.item(i);
                fileArr.push(file);
            }
            this.addIMGFile.value = "";
            var symIndex = this.fileList.length;
            this.postFileToOss(fileArr, {
                symbol: symIndex,
                typeArr:this.typeArr,
                errorFn: function(e) {
                    console.error(e);
                    this.isFail = true;
                    this.failMessage = "上传失败，服务器异常！";
                },
                startUploadFn: function(sym, src,name,type) {
                    this.IMGFileArrChange("add", {
                        sym: sym,
                        url: null,
                        src: src,
                        name:name,
                        type:type,
                    });
                }.bind(this),
                progress: function(sym, len,name,type) {
                    var widget = this;
                   
                    var lens = parseInt(len * 100);
                    widget.IMGFileArrChange("change", {
                        sym: sym,
                        length: lens,
                        status: 0,
                        name:name,
                        type:type,
                    });
                      
                }.bind(this),
                successFn: function(url, urlObj, sym,name,type) {
                    this.IMGFileArrChange("change", {
                        sym: sym,
                        length: 100,
                        url: url,
                        status: 1,
                        name:name,
                        type:type,
                    });
                }.bind(this),
                OssErrorFn: function(sym,name,type) {
                    this.IMGFileArrChange("change", { sym: sym, status: -1,name:name,type:type});
                }.bind(this)
            });
        },
        _getAddFileIMGMaxLength() {
            let length = 0;
            for (let i = 0, ilen = this.fileList.length; i < ilen; i++) {
                if (!this.fileList[i].isDelete) length++;
            }
            var addLength = this.MAX_IMG_LENGTH - length;
            return addLength;
        },
        //操作存储上传文件的数组
        IMGFileArrChange(type, option, index) {
            switch (type) {
                case "add":
                    this.IMGFileViewAdd(option);
                    break;
                case "remove":
                    this.IMGFileViewRemove(option);
                    break;
                case "change":
                    this.IMGFileViewAddChange(option, index);
                    break;
            }
        },
        IMGFileViewAdd(option) {
            this.fileList.push({
                msrc: option.src,
                src: option.src,
                status: false,
                loadLength: 0,
                name:option.name,
                type:option.type,
                isDelete: false,
                ossPath: ""
            });
            this.$emit("fileUploads",this.attachments,false);
        },
        IMGFileViewAddChange(option, index) {
            if (option.status == -1) {
                this.fileList[option.sym].isDelete = true;
                this.isFail = true;
                this.failMessage = "网络波动，请重上传！";
            }
            if (option.status == 0) {
                this.fileList[option.sym].loadLength = option.length;
            }
            if (option.status == 1) {
                if (!this.fileList[option.sym].isDelete) {
                    this.attachments.push(option.url);
                    this.fileList[option.sym].status = true;
                    this.fileList[option.sym].ossPath = option.url;
                }
            }

        },
        postFileToOss: (function() {
            var _this = this;
            function getKey(file, option, _this) {
                if (checkFileType(file, option,_this)) {
                    option.errorFn && option.errorFn();
                    return false;
                }
                for (var i = 0; i < file.length; i++) {
                    postFile( file[i], option, i);
                }
            }
            function getSymbol(_symbol, index) {
                var symbolStr = 0;
                if (_symbol) {
                    symbolStr = _symbol + index;
                } else {
                    symbolStr += index;
                }
                return symbolStr;
            }
            function postFile( file, option, i) {
                var _sym = getSymbol(option.symbol, i);
                if (option.startUploadFn) {
                    var windowURL = window.URL || window.webkitURL;
                    var src = windowURL.createObjectURL(file);
                    option.startUploadFn(_sym, src,file.name,file.type);
                }
                var fileValue = file.value || file.name || " ";
                var suffix = fileValue.substr(fileValue.indexOf("."));
                var mydate = new Date();
                var uuid =
                    "ppandzy" +
                    mydate.getDay() +
                    mydate.getHours() +
                    mydate.getMinutes() +
                    mydate.getSeconds() +
                    mydate.getMilliseconds() +
                    "" +
                    Math.round(Math.random() * 10000);
                var storeAs = (option.name || uuid) + suffix;
                let config = {
                //添加请求头
                // headers: { "Content-Type": "multipart/form-data" },
                //添加上传进度监听事件
                onUploadProgress:  function (progressEvent) {
                    var completeProgress = ((progressEvent.loaded / progressEvent.total ) || 0) ;
                    option.progress && option.progress( _sym,completeProgress,file.name,file.type);
                    }
                };
                const formDate = new FormData();
                formDate.append("file", file);
                formDate.append("time", +new Date());
                const url = serverPath;
                // const url = "http://127.0.0.1:8081/upload"
                axios.post(url,formDate,config).then(function(result) {
                        var rqUrl;
                        result = result.data;
                        if (result.url[0].lastIndexOf("?") !== -1) {
                            rqUrl = result.url[0].substr(
                                0,
                                result.url[0].lastIndexOf("?")
                            );
                        } else {
                            rqUrl = result.url[0];
                        }
                        option.successFn &&
                            option.successFn(rqUrl, result, _sym,file.name,file.type);
                    })
                    .catch(function(err) {
                        option.OssErrorFn && option.OssErrorFn(err, _sym,file.name,file.type);
                        option.errorFn && option.errorFn(err, _sym,file.name,file.type);
                        console.log(err);
                    });
            }
            function getCheckName (arr){
                var msg =[]; 
                arr.forEach(function(item){
                    msg.push(item.name);
                })
                return msg.join("、")
            }
            function checkFileType(files, option,_this) {
                option && option.typeArr && option.typeArr.length || (option = {
                    typeArr: []
                });
                if(!option.typeArr.length)return false   // 如果没有 表示不校验
                var flag = !0;
                for (var i = 0,ilen=files.length; i < ilen; i++) {
                    var file = files[i];
                    for (var j = 0,jlen=option.typeArr.length; j < jlen; j++) {
                        if (option.typeArr[j].type && (file.type.indexOf(option.typeArr[j].type) !=-1 )) {
                            flag = !1;
                            break
                        }
                    }
                }
                if(flag){
                    var msg = getCheckName(option.typeArr);
                    _this.$vux.alert.show({
                        title: '文件格式错误',
                        content: `请上传${msg||"指定类型"}文件！`,
                        onShow () {
                        },
                        onHide () {
                        }
                    })
                    option.typeErrorFn && option.typeErrorFn()
                }
                return flag
            }
            return function(file, option) {
                getKey(file, option, this);
            };
        })()
    }
}
</script>
<style>
.uploadFile_files_list{
    background-color: #fff;
}
.uploadFile_files-right{
    display: flex;
    align-items: center;
}
.uploadFile_files{
    padding:10px 15px;
    color: #999;
    cursor: pointer;
    display: flex;
}
.uploadFile_file_pdf{
    width: 15px;
    height: 15px;
}

.uploadFile_file_pdf_status{
    text-align: right;
    display: inline-block;
    color: #38b03f;
    font-size: 12px;
}
.uploadFile_file_pdf_status .uploading{
    color: #000;
}
.uploadFile_file_pdf_delete{
    width: 15px;
    height: 15px;
    margin-left:8px;
}
.uploadFile_imgs_list {
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.uploadFile_imgs {
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 75px;
    height: 75px;
    overflow: hidden;
    margin-left: 15px;
    margin-top: 15px;
    padding: 0;
}
.uploadFile_img {
    width: 100%;
    height: 100%;
}
.uploadFile_addimg {
    width: 60px;
    height: 60px;
    margin-top: 14px;
    margin-left: 15px;
    border: 1px solid #e8e8e8;
}
.uploadFile_addimgSub1 {
    width: 2px;
    height: 38px;
    background-color: #e8e8e8;
    margin-left: 29px;
    margin-top: 11px;
}
.uploadFile_addimgSub2 {
    width: 38px;
    height: 2px;
    background-color: #e8e8e8;
    margin-left: 11px;
    margin-top: -19px;
}
.uploadFile_file_status {
    width: 75px;
    top: 55px;
    text-align: right;
    display: inline-block;
    color: #38b03f;
    position: absolute;
}
.uploadFile_file_status .uploading {
    color: #000;
}

.uploadFile_file_delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    z-index: 1;
}
</style>