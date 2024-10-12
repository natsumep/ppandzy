<!--
 * @Author: fangp
 * @Date: 2020-05-26 10:52:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 16:15:24
--> 
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
            <div class="footer">
                你的勇敢 我的触不及防
                <br />承蒙你出现 够我欢喜好几年
                <br />--by PP And ZY
            </div>
        </div>
        <div slot="bottom">
            <van-tabbar
                route
                :fixed="false"
                active-color="#e2a18c"
            >
                <van-tabbar-item
                    replace
                    to="/main/main"
                    icon="shop-collect-o"
                >ppzy</van-tabbar-item>
                <van-tabbar-item
                    replace
                    to="/main/qs"
                    icon="records"
                >情书</van-tabbar-item>
                <van-tabbar-item
                    replace
                    to="/main/map"
                    icon="guide-o"
                >map</van-tabbar-item>
                <van-tabbar-item
                    replace
                    to="/main/record"
                    icon="smile-comment-o"
                >说说</van-tabbar-item>
            </van-tabbar>

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

.project-main{
    min-height:100%;
    display flex;
    flex-direction: column;
    justify-content:space-between;
    padding-bottom: 10px;
}
.footer {
    text-align: center;
    font-size: 14px;
    
}
</style>