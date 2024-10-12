<!--
 * @Author: fangp
 * @Date: 2020-05-26 10:52:04
 * @LastEditors: 
 * @LastEditTime: 2020-05-26 16:00:40
--> 
<template>
    <div class="widget-vertical-three" :style="mainStyle">
        <div class="widget-vertical-three-header">
            <slot name="header"></slot>
        </div>
        <div class="widget-vertical-three-main" ref="viweMain">
            <slot></slot>
        </div>
        <div class="widget-vertical-three-footer">
            <slot name="bottom"></slot>
        </div>
    </div>
</template> 
<script>
export default {
    data() {
        return {
            mainStyle: {
                height: "100%",
            }
        };
    },
    components: {},
    props: [],
    methods: {
    },
    created() {
    },
    methods: {
    }

};
</script>
<style lang="stylus">
.widget-vertical-three{
    min-height 100vh;
}
.widget-vertical-three-footer
{
    position: fixed;
    bottom: 0;
    width:100%;
}
.widget-vertical-three-main{
   min-height:100%;
   padding-bottom: 50px;
}
</style>