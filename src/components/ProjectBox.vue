<template>
    <div>
        <div
            v-for="group in this.children"
            :key="group.id"
            class="project-item"
        >
            <span class="title">{{group.groupName}}</span>
            <div class="content">
                <div
                    v-if="group.type && group.type=='span'"
                    v-for="item in group.groupItem"
                    :key="item.id"
                    class="spanItem"
                >
                    <a
                        :href="item.pageUrl"
                        target="_blank"
                    >{{item.pageName}}</a>
                </div>
                <div
                    v-if="!group.type"
                    class="contenItem"
                    v-for="item in group.groupItem"
                    :key="item.id"
                >
                    <div class="name">
                        <a
                            :href="item.pageUrl"
                            target="_blank"
                        >{{item.pageName}}</a>
                    </div>
                    <div
                        class="address"
                        v-if="item.changeServeType"
                    >
                        <div class="address-input">
                            <span class="tip">自定义服务端地址</span>
                            <input
                                v-model="item.defaultUrl"
                                :placeholder="item.defaultUrl"
                            />
                            <span
                                class="tip jump"
                                v-on:click="jumpEvt(item.pageUrl,item.defaultUrl)"
                            >跳转</span>
                        </div>
                        <div class="tips">
                            {{item.changeServeTip || "输入地址可以切换服务器：" + item.defaultUrl }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            customizeUrl: ""
        };
    },
    props: ["children"],
    created() {
        this.customizeUrl = this.children.defaultUrl || "";
    },
    methods: {
        jumpEvt(pageUrl, inputUrl) {
            debugger;
            if (this.checkUrl(inputUrl)) {
                let url = this.customizeUrl || inputUrl;
                window.open(pageUrl + "?url=" + url, "_blank");
            }
        },
        checkUrl(inputUrl) {
            if (!inputUrl) {
                this.$message({
                    message: "输入不能为空",
                    type: "warning"
                });
                return false;
            }
            return true;
        }
    }
};
</script>
<style scoped lang="stylus">
.project-item {
    text-align: left;
    margin-bottom: 20px;
    padding: 10px;

    .title {
        width: auto;
        color: #333;
        font-size: 20px;
        padding: 4px 2px;
        border-bottom: 4px solid #5bc0de;
    }

    .content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 6px;

        & .spanItem {
            margin: 10px;

            & a {
                color: #333;

                &:hover {
                    color: #5bc0de;
                    transition: all 1s;
                }
            }
        }
    }

    .contenItem:hover {
        cursor: pointer;
        box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
        transition: all 1s;
    }

    .contenItem {
        display: inline-block;
        width: 23%;
        min-height: 50px;
        margin: 14px;
        border-radius: 4px;
        background-color: #9e9e9ed6;
        padding: 4px;

        .name {
            text-align: center;
            padding: 10px;
            padding-bottom: 10px;
        }

        .name a {
            cursor: pointer;
            text-decoration: none; 
            color: #ffffff;

            &:hover {
                color: #03A9F4;
                transition: all 1s;
            }
        }

        .address-input {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            margin-bottom: 10px;
            color: #fff;

            .tip {
                box-sizing: border-box;
                height: 30px;
                padding: 5px 10px;
                background-color: #5bc0de;
                border-radius: 4px 0px 0px 4px;
            }

            input {
                height: 30px;
                box-sizing: border-box;
                padding-left: 10px;
                color: #b0b0b0;
            }

            .jump {
                border-radius: 0px 4px 4px 0px;

                &:hover {
                    background-color: #08637d;
                    transition: all 1s;
                }
            }
        }

        .tips {
            padding-left: 10px;
            border-radius: 4px;
            font-size: 12px;
            color: #fff;
        }
    }
}
</style>

