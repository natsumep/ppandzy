<template>
  <div class="record-add-main">
    <van-field
      v-model="message"
      rows="5"
      autosize
      label="留言"
      type="textarea"
      placeholder="请输入留言"
    />
    <van-field
      v-model="coordinate"
      center
      clearable
      label="坐标"
      placeholder="获取当前坐标"
    >
      <template #button>
        <van-button @click="getNowLoaction" size="small" type="primary"
          >重新获取坐标</van-button
        >
      </template>
    </van-field>
    <van-field v-model="address" label="地理位置" placeholder="当前位置" >
      <template #button>
        <van-button @click="getTxLoaction" size="small" type="primary"
          >重新获取腾讯坐标</van-button
        >
      </template>

    </van-field>
  </div>
</template>

<script>
import { locationService } from "Services/location";

export default {
  data() {
    return {
      message: "",
      coordinate: "",
      address: ""
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
      });
    },
    getTxLoaction(){
      locationService.getTxLocInfo().then(data=>{
         this.coordinate = data.coordinate.join(",");
        this.address = data.address;
      })
    }
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
</style>
