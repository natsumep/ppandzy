<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
        </router-view>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import index from "Views/index";
export default {
    data() {
        return {
            // showError: false,
            // showErrorText: defaultErrorText
        };
    },
    components: {
        index
    },
    methods: {
        bindEvent() {
            GLOBAL.vbus.$on("global.$dialog.confim", (obj, a, b) => {
                // Dialog.confirm({
                //     title: obj.title,
                //     message: obj.content
                // })
                //     .then(() => {
                //         obj.fn();
                //     })
                //     .catch(() => {
                //         b&& b();
                //         GLOBAL.NProgress.done();
                //     });
            });
            GLOBAL.vbus.$on("global.$dialog.alert", (obj, a, b) => {
                // Dialog.alert({
                //     title: obj.title,
                //     message: obj.content
                // }).then(() => {});
            });
            let _this = this;
            GLOBAL.vbus.$on("global.$dialog.show", a => {
                // if (_this.showError) {
                //     _this.showError = false;
                //     _this.showErrorText = defaultErrorText;
                //     _this.$nextTick(() => {
                //         a && (_this.showErrorText = a);
                //         _this.showError = true;
                //     });
                // } else {
                //     a && (_this.showErrorText = a);
                //     _this.showError = true;
                // }
            });
        },
        /*   defaultEvent() {
           var overscroll = function(el) {
                el.addEventListener("touchstart", function() {
                    var top = el.scrollTop,
                        totalScroll = el.scrollHeight,
                        currentScroll = top + el.offsetHeight;
                    if (top === 0) {
                        el.scrollTop = 1;
                    } else if (currentScroll === totalScroll) {
                        el.scrollTop = top - 1;
                    }
                });

                el.addEventListener("touchmove", function(evt) {
                    if (el.offsetHeight < el.scrollHeight)
                        evt._isScroller = true;
                });
            };

            overscroll(document.querySelector("body"));
            document.body.addEventListener("touchmove", function(evt) {
                if (!evt._isScroller) {
                    evt.stopPropagation();
                }
            }); 
        },*/
        init() {
            // this.getUserInfo();
        }
    },
    created() {
        this.init();
        //this.defaultEvent();
        this.bindEvent();
    }
};
</script>
<style lang ="stylus">

* {
    box-sizing: border-box;
}

html {
    font-size: 100px;
}

body {
            -webkit-font-smoothing: antialiased;
            font-family: Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
            background-color: #D3E3F2;
            font-size 16px;
        }

html, body, pre {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

for _px in (0..33) {
    @media (min-width: (970 + _px * 50) px) {
        html {
            font-size: (42 + ((((970 + _px * 50) - 970) / 100) * 6))px;   /* 每50px  + 3px 字体大小  */
        }
    }
}
@media (max-width: 970px){
    html{
        font-size:42px;
    }
}
</style>

