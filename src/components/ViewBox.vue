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
    display flex;
    flex-direction column;
    min-height 100vh;
    height 100%;
}
.widget-vertical-three-header,
.widget-vertical-three-footer
{
    flex: 0 0 auto;
}
.widget-vertical-three-main{
   flex: 1 1 auto;
}
</style>