<template>
    <div class="wave-icon-box">
        <div :class="[{'wave-icon-animation':animation},'wave-icon']">
            <img
                style="height:100%;width:100%;"
                v-if="icon"
                :src="icon"
                :alt="type"
            >
        </div>
        <span v-if="title" class="wave-icon-title">{{title}}</span>
    </div>

</template>  
<script>
import change from "Assets/images/icon/change.svg";
import statistic from "Assets/images/icon/statistic.svg";
import close from "Assets/images/icon/close.svg";
import system from "Assets/images/icon/system.svg";
import chart from "Assets/images/icon/chart.svg";
import earth from "Assets/images/icon/earth.svg";
import big from "Assets/images/icon/big.svg";

export default {
    data() {
        return {
            icon: ""
        };
    },
    created() {
        switch (this.type) {
            case "change":
                this.icon = change;
                break;
            case "statistic":
                this.icon = statistic;
                break;
            case "close":
                this.icon = close;
                break;
            case "system":
                this.icon = system;
                break;
            case "chart":
                this.icon = chart;
                break;
            case "earth":
                this.icon = earth;
                break;
            case "other":
                this.icon = big;
                break;
        }
    },
    components: {},
    props: {
        size: {},
        type: {
            required: true
        },
        animation: {
            default: true
        },
        title: {}
    },
    methods: {}
};
</script>
<style lang="stylus">
_shadow_left = rgba(0, 183, 234, 0.149);
_shadow_right = rgba(31, 209, 253, 0.3);
.wave-icon-box{
    font-size:50px;
    width:1em;
    margin: 0.11em;
    position relative
}
.wave-icon {
    height: 1em;
    width: 1em;
    border: 0.05em solid #044362;
    border-radius: 50%;
    box-shadow: 0 0 0px 0.14em _shadow_left, 0 0 0.06em 0.06em _shadow_right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-image: linear-gradient(175deg, #24e1fe, #006cff);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    padding: 0.18em;
    position: relative;
}
.wave-icon-title{
    position absolute
    left:50%;
    transform: translateX(-50%);
    font-size:0.1rem;
    word-break keep-all
    text-align:center;
    color:#fff;
    margin-top: 5px;
    opacity 1;
    margin-bottom -0.3em
    // transition opacity 0.3s
}
.wave-icon-box:hover .wave-icon-title{
    opacity 1
}
.wave-icon-animation:hover {
    animation: wave-icon-animation 3s infinite;
}

.wave-icon-animation img {
    transition: all 1s;
}

.wave-icon-animation:hover img {
    transform: scale(1.15);
}

.wave-icon-animation:hover::before {
    content: '';
    width: 1.05em;
    height: 1.05em;
    border-top: 0.04em solid #67c1d2;
    border-left: 0.04em solid #67c1d2;
    background-size: contain;
    position: absolute;
    top: -0.09em;
    left: -0.09em;
    border-radius: 50%;
    /* -webkit-animation: rotate360 3s ease-out infinite; */
    animation: rotate360 3s cubic-bezier(1, 1, 0, 0) infinite;
}

@keyframes rotate360 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes wave-icon-animation {
    0% {
        box-shadow: 0 0 0px 0.08em _shadow_left, 0 0 0.03em 0.03em _shadow_right;
    }

    50% {
        box-shadow: 0 0 0px 0.26em _shadow_left, 0 0 0.12em 0.12em _shadow_right;
    }

    100% {
        box-shadow: 0 0 0px 0.08em _shadow_left, 0 0 0.03em 0.03em _shadow_right;
    }
}
</style>>

