<template>
  <div style="height:100%;background:#fff;">
    <div class="not-found-msg">您访问的页面未找到...</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import index from "Views/index";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {},
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
  }
};
</script>
<style>
.not-found {
  margin-top: 100px;
  width: 100%;
}
.not-found-msg {
  text-align: center;
  width: 50%;
  margin: 40px auto 0px;
  color: #666;
}
</style>

