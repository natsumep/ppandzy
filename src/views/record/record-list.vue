<template>
 <div>
    <div class="memory-header">
      <van-button @click="addNew()" type="primary" size="small">又一次往日时光</van-button>
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
.memory-header{
  display flex;
  justify-content flex-end
  padding 15px;
}
</style>