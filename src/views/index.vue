<template>
  <view-box>
    <div slot="header">
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
    };
  },
  mounted() {},
  methods: {
  },
  created() {}
};
</script>
<style lang="stylus" >
.footer {
  text-align: center;
  font-size: 14px;
}

</style>