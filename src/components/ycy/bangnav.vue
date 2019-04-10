<template>
    <div class="_bangnav">
        <header class='head'>
                <el-row type="flex" justify="center">
                    <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                        <nav class='nav'>
                            <div class='left'>
                                <a @click="goBack">返回</a>
                            </div>
                            <div class="rank">
                                <h2>排行榜</h2>
                            </div>
                            
                            <div class='right'>
                                <a @click="showLiuYan">交流</a>
                            </div>
                        </nav>
                    </el-col>
                </el-row>
            </header>
        <div class='out'>
            <div class="center_box">
                <div style="font-size:12px;">喜欢的话,编程大赛投票14号哈</div>
                <transition-group class="game_box" name="list-complete" tag="div">

                            <div v-for="(item) in items" :key="item.index" class="list-complete-item item">
                                <img class="img" :src="item.src" @click="showBang(item)">
                            </div>
                </transition-group>
            </div>
        </div>
         
    </div>
</template>
<style lang="scss">
._bangnav{
        .el-row{
                margin-bottom: 0;
        }
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        .head{
            flex:0 0 80px;
            background-color: #27ae60;
            width:100%;
             .nav{
                display: flex;
                justify-content:space-between;//两端对齐
                margin:0px;
                .left{
                    display: flex;
                    width:90px;
                    height:80px;
                    align-items: center;
                    justify-content: center;
                    color:white;
                    // background-color: red;
                    font-family:Microsoft YaHei;
                    font-size: 22px;
                    a{
                        color:white;
                        cursor: pointer;
                    }
                    a:hover{
                        text-shadow: 0 0 1px white;
                    }
                }
                .rank{
                    color:white;
                    height:80px;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;
                }
                .right{
                    display: flex;
                    width:90px;
                    height:80px;
                    align-items: center;
                    justify-content: center;
                    color:white;
                    // background-color: red;
                    font-family:Microsoft YaHei;
                    font-size: 22px;
                    a{
                        color:white;
                        cursor: pointer;
                    }
                    a:hover{
                        text-shadow: 0 0 1px white;
                    }
                    
                    
                }
            }
        }
        .out{    
            // border:1px solid red;
            flex:auto; 
            display: flex;
             align-items: center;
              justify-content: center;
            .center_box {
                    width: 300px; //  border:1px solid green;
                    margin-top:-40px;
                    display: flex;
                    flex-flow: column wrap; //横向排列,换行
                    align-items: center;
                    .game_box {
                        display: flex;
                        flex-flow: row wrap; //横向排列,换行
                        justify-content: center;
                        .item {
                            border: 1px solid green;
                            flex: 0 0 98px; //每个固定80像素
                            height: 98px;
                            width: 98px;
                            .img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
            }
        }
       
}
    
</style>

<script>
export default {
    data(){
        return {
            items: [
                {
                    index: 0,
                    src: 'static/img/bang/bang0.jpg',
                    url: 'bang'
                },
                {
                    index: 1,
                    src: 'static/img/bang/bang2.jpg',
                    url: 'daybang'
                },
                  {
                    index: 2,
                    src: 'static/img/bang/bang1.jpg',
                    url: 'speedbang'
                },
                {
                    index: 3,
                    src: 'static/img/bang/bang3.jpg',
                    url: 'bangtotal'
                },
                {
                    index: 4,
                    src: 'static/img/bang/bang4.jpg',//中间
                    tip: '总分榜Lv12等级以上玩家开放'
                },
                {
                    index: 5,
                    src: 'static/img/bang/bang5.jpg',
                    outurl:'https://m.ke.qq.com/mcates/ccyy/detail.html?act_id=1&work_id=1068',
                },
                {
                    index: 6,
                    src: 'static/img/bang/bang6.jpg',
                    isycy: true
                },
                {
                    index: 7,
                    src: 'static/img/bang/bang7.jpg',
                    isycy: true
                },
                {
                    index: 8,
                    src: 'static/img/bang/bang8.jpg',
                    isycy: true
                },

            ],
        }
    },
    mounted(){
        
    },
    methods:{
        goBack(){
             this.$router.go(-1);
        },
        showBang(item){
            if(item.url){
                this.$router.push({ path: item.url });
                return;
            }
            if(item.tip){
                this.$message({ message: item.tip, type: "warn" , showClose: true})
                return;
            }
            if(item.outurl){
                window.location.href=item.outurl;
                return;
            }
            
        },
         showLiuYan(){
            this.$router.push({ path: "/liuyan" });
        }
    }
}
</script>