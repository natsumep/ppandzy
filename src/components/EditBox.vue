<template>
    <div class="edit-box">
        <el-card>
            <div slot="header" class="clearfix">
                <span>修改配置</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="sumbit()">提交</el-button>
            </div>
            <div class="content">
                <div class="content-config">
                {{getConfig}}
                </div>
                <el-input
                type="textarea"
                :rows="18"
                placeholder="请输入json数据格式"
                v-model="inputConfig"
                class="content-textarea"
                >
                </el-input> 
            </div>

        </el-card>         
    </div>
      
</template>

<script>
export default {
    data() {
        return {
            inputConfig: "",
        };
    },
    props: ["children"],
    created(){
    },
    methods: {
        sumbit(){
            if(this.checkInput()){
            this.$api["project/edit"]({value:this.inputConfig}).then(
                data=>{  
                    this.$message({
                    message: '修改成功',
                    type: 'success'
                    });         
                },
                ()=>{
                    this.$message.error('修改失败');
                }
            );
            }
        },
        checkInput(){
            if(!this.inputConfig){
                this.$message({
                message: '输入不能为空',
                type: 'warning'
                });             
                return false;
            }
            return true;
        }
    },
    computed: {
        getConfig(){
            return JSON.stringify(this.children);
        }
    }
};
</script>
<style scoped lang="stylus">
.edit-box
  width 100%
  margin 0 auto
.edit-box .content
  display flex 

.edit-box .content-config
  width 50% 
  border 1px solid #b0b0b0
  border-radius 4px
  color #b0b0b0
  word-break:break-all;
  padding 10px;
  margin-right 10px;
  height 390px;
  overflow auto;
.edit-box .content-textarea
  width 50%  
</style>

