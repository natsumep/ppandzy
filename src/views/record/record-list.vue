<template>
 <div>
    <div>
      <van-button @click="addNew()" type="primary">发布说说</van-button>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  mounted() {},
  methods: {
    addNew(){
      this.$router.push("record-add");
    }
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