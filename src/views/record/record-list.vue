<template>
  <div>
    <div class="memory-header">
      <span class="memory-total"
        >总共记录往日时光<span class="memory-total-number"> {{ total }} </span
        >条</span
      >
      <van-button @click="addNew()" type="primary" size="small"
        >又一次往日时光</van-button
      >
    </div>
    <div class="main-list">
      <div class="memory-item" v-for="item in data" :key="item.id">
        <p class="pp-flex-betWeen">
          <span class="memory-title">{{ item.title }}</span>
          <span class="memory-coordinate">{{ item.coordinate.join(",") }}</span>
        </p>

        <p class="memory-message">
          甜蜜事件：{{ item.message || "啦啦啦啦啦~~ 就只是打个卡" }}
        </p>
        <div class="memory-imgs">
          <div class="img-content" v-for="(img,index) in item.pathsThumb" :key="img" @click="openImg(item.paths,index)">
            <img :src="img" alt="" />
          </div>
        </div>
        <p class="memory-address">
          地点： {{ item.address }}
          <span
            >({{ item.source == "tencentMap" ? "腾讯地图" : "官方地图" }})</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileThumb } from "Utils/files";
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      data: [],
      total: 0,
    };
  },
  methods: {
      openImg(list,index){
        ImagePreview({
        images: [
            ...list
        ],
        startPosition: index,
        });
      },
    addNew() {
      this.$router.push("record-add");
    },
    async loadData() {
      const data = await this.$api["main/memory/list"]();
      this.data = data.data.map((item) => {
        item.pathsThumb =
          (item.paths &&
            item.paths.length &&
            item.paths.map((img) => {
              return getFileThumb(img);
            })) ||
          [];
        return item;
      });
      this.total = data.total || this.data.length;
    },
  },
  beforeCreate() {},
  created() {
    this.loadData();
  },
  mounted() {},
};
</script>
<style scoped lang="stylus" >
.memory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 3px;
  box-shadow: 0px 0px 8px 1px #c2c2c2;
}

.memory-total {
  color: #5d5d5d;
}

.memory-total-number {
  color: #42b983;
}

.main-list {
  padding: 5px;
}

.memory-item {
  padding: 10px 15px;
  border-bottom: 1px solid #c7c7c7;
}

.memory-title {
  color: #8BC34A;
}

.memory-coordinate {
  font-size: 12px;
  color: #999;
}

.memory-address {
  font-size: 13px;
  color: #888;
}

.memory-message {
  padding-top: 10px;
}

.memory-imgs {
  margin: 0 -10px;
  padding: 5px;
  font-size: 0;
  display: flex;
}

.memory-imgs .img-content {
  width: 25%;
  margin: 5px;
  position: relative;
}

.memory-imgs .img-content:after {
  display: block;
  padding-top: 100%;
  content: '';
}

.memory-imgs .img-content img {
  width: 100%;
  position: absolute;
  height: 100%;
  object-fit: cover;
}
</style>