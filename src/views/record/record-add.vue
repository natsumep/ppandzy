<template>
  <div class="record-add-main">
    <van-field v-model="title" clearable label="标题" placeholder="输入标题" />
    <van-field
      v-model="message"
      rows="5"
      autosize
      label="内容"
      type="textarea"
      placeholder="输入内容"
    />
    <van-field
      v-model="coordinate"
      clearable
      type="textarea"
      label="坐标"
      placeholder="获取当前坐标"
    >
      <template #button>
        <van-button @click="getNowLoaction" size="small" type="default"
          >重新获取坐标</van-button
        >
      </template>
    </van-field>
    <van-field
      v-model="address"
      label="地理位置"
      type="textarea"
      placeholder="当前位置"
    >
      <template #button>
        <van-button @click="getTxLoaction" size="small" type="default"
          >重新获取腾讯坐标</van-button
        >
      </template>
    </van-field>
    <upload-file :children="{}" @fileUploads="getUploadFiles"></upload-file>
    <div class="record-add-btns">
      <van-button @click="publishRecord" size="small" type="primary"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import { locationService } from "Services/location";

export default {
  data() {
    return {
      message: "",
      coordinate: "",
      address: "",
      title: "",
      paths:[],
      fileStatus: true,
      loactionInfo: {},
      source:"unkown"
    };
  },
  mounted() {},
  methods: {
    getNowLoaction() {
      this.initLocation();
    },
    initLocation() {
      locationService.getLocInfo().then(data => {
        this.coordinate = data.coordinate.join(",");
        this.address = data.address;
        this.loactionInfo = data.coordInfo;
        this.source = data.source;
      });
    },
    getTxLoaction() {
      locationService.getTxLocInfo().then(data => {
        this.coordinate = data.coordinate.join(",");
        this.address = data.address;
      });
    },
    publishRecord() {
      let { title, message, coordinate, address,loactionInfo,source,paths} = this;
      loactionInfo = JSON.stringify(loactionInfo)
      coordinate=`[${coordinate}]`;
      paths =  JSON.stringify(paths)
      this.$api["main/memory/post"]({ title, message, coordinate, address,loactionInfo,source,paths})
      .then(data=>{
        this.$toast({
          message: '往日时光记录成功',
          icon: 'like-o',
        });
        this.$router.push("record");
      },(e)=>{

        alert(e)
      })
    },
     getUploadFiles(files,fileStatus){
            this.paths = files;
            this.fileStatus = fileStatus;
        },
  },
  created() {
    this.initLocation();
  }
};
</script>
<style lang="stylus">
.record-add-main{
  margin-top:15px;
}
.record-add-btns{
  margin :15px;
  display flex;
  justify-content:flex-end;
}
</style>
