<template>
  <div style="padding:10px;" v-html="qingshu">
  </div>
</template>

<script>
import { getQinghua } from "./qingshu"
export default {
  data() {
    return {
        qingshu:"love u ,miss u, need u;"
    };
  },
  components: {},
  methods: {},
  created() {
      this.qingshu = getQinghua("阿贞宝宝");
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
  }
};
</script>
<style>
.flow-text {
    text-indent: 32px;
    line-height: 27px;
    margin-bottom: 10px;
}
</style>

