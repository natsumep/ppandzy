<template>
  <view-box>
    <div slot="header">
      <van-tabbar route :fixed="false" active-color="#e2a18c">
        <van-tabbar-item replace to="/main/main" icon="shop-collect-o">ppzy</van-tabbar-item>
        <van-tabbar-item replace to="/main/qs" icon="records">情书</van-tabbar-item>
        <van-tabbar-item replace to="/main/record" icon="smile-comment-o">说说</van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="project-main">
      <div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
    <div slot="bottom">
      <div class="footer">
        你的勇敢 我的触不及防
        <br />承蒙你出现 够我欢喜好几年
        <br />--by PP And ZY
      </div>
    </div>
  </view-box>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  mounted() {},
  methods: {},
  created() {}
};
</script>
<style lang="stylus" >
.footer {
  text-align: center;
  font-size: 14px;
}
</style>