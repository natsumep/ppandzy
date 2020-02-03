<template>
 <div>
    <edit-box :children="projectList"></edit-box>
 </div>
</template> 

<script>
export default {
    data() {
    return {
        projectList: [],
        loadingInstance: null,
    };
    },
    mounted() {
    },
    methods: {
        init(){
           
            this._getData("project/config").then(data => {
                this.projectList = data;
                this.$nextTick(() => {  
                    this.loadingInstance.close();
                    this.loadingInstance = null;
                });
            })
        },
        _getData(url) {
            return new Promise((resolve, reject) => {
                this.$api[url]().then(
                    data => {
                        resolve(data.body.data);
                    },
                    data => {
                        reject();
                    }
                );
            });
        },
    },
    created() {
        this.loadingInstance = this.$loading.service({ fullscreen: true });
        this.init();
    }
};
</script>
<style lang ="stylus">
</style>

