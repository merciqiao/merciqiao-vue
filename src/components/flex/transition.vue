<template>
    <div>
        <el-button type="primary" @click="leftShow=!leftShow">切换</el-button>
         <!-- css3过渡版本 -->
         <div>css3过渡版本</div>
        <div class='trasionbox'>
            <div class='left' :class="leftShow?'left_show':'left_hide'">
            </div>
            <div class='right'>
            </div>
        </div>
        <!-- vue过渡版本 -->
         <div>vue过渡版本</div>
         <div class='trasionbox'>
            <transition name="fade">
                <div class="left left_show" v-if="leftShow"></div>
            </transition>
            <div class='right'>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            leftShow:true
        }
    }
}
</script>
<style lang="scss">
    .trasionbox{
        display: flex;
        .left{
            background-color:green;
            height:300px;
            //flex:0 0 300px;
            transition: width 1s ease-in-out;
        }
        .left_show{
            width:300px;
         }
        .left_hide{
           width:60px;
        }
        .right{
            border:1px solid blue;
            height:300px;
            flex:auto;
            transition: width 1s ease-in-out;
        }
        .fade-enter-active, .fade-leave-active {
            transition: width 1s ease-in-out;
        }
        .fade-enter, .fade-leave-to {
            width: 60px;
        }
    }
</style>




