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
                                <h2>答案提示</h2>
                            </div>
                            
                            <div class='right'>
                                <!--<a @click="showLiuYan">交流</a>-->
                            </div>
                        </nav>
                    </el-col>
                </el-row>
            </header>
        <div class='out'>
            <div class="center_box">
                <div style="font-size:14px;">
                    <div>1.公交车:超越微博搜吃鸡</div>
                    <div>2.动画:微博搜杨超越吹牛</div>
                    <div>3.动物:创时跳101</div>
                    <div>4.动物二:喜欢抓的动物</div>
                    <div>5.奖牌:2018年度影响中国人物奖和超新星运动会</div>
                    <div>6.毛绒玩具:应援吉祥物</div>
                    <div>7.袜子:横冲直撞20岁聚餐的一期超越着装</div>
                    <div>8.水果:超越经常吃的水果</div>
                    <div>9.洗发水:代言的洗发水</div>
                    <div>10.性格:超越经常用来形容自己的性格</div>
                    <div>11.饮料:代言的饮料</div>
                    <div>12.综艺:参加的综艺</div>
                    <div>13.色卡:超越的应援色</div>
                    <div>14.武功:超越想学的武功</div>
                    <div>15.数字:最重要的生日</div>
                    <div>16.数字二:身高</div>
                    <div>17.发型:大哥教你梳..</div>
                    <div>18.牛仔裤:微博搜杨超越破洞牛仔裤</div>
                    <div>一大波更有挑战的...</div>
                </div>
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
                    margin-top:10px;
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
import apis from '../../apis/apis';
export default {
    data(){
        return {
        }
    },
    mounted(){
         var loginLog = {
                    ip: returnCitySN["cip"],
                    city: this.$common.getCity(),
                    type:'查看答案提示'
                };
                apis.shiroApi.loginLog(loginLog);
    },
    methods:{
        goBack(){
             this.$router.go(-1);
        },
         showLiuYan(){
            this.$router.push({ path: "/liuyan" });
        }
    }
}
</script>