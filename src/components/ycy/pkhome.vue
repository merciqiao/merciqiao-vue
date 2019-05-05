<template>
    <div class="_pkhome">
         <header class='head'>
                <el-row type="flex" justify="center">
                    <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                        <nav class='nav'>
                            <div class='left'>
                                <a @click="goBack">返回</a>
                            </div>
                            <div class="rank">
                                <h2>PK房间</h2>
                            </div>
                            
                            <div class='right'>
                                <a>{{state}}</a>
                            </div>
                        </nav>
                    </el-col>
                </el-row>
            </header>
            <div class='out'>
                <div v-if="!intoGame">
                    <div>
                        当前房间人数:{{allCount}}人
                    </div>
                    <div>
                        当前游戏中队数:{{intoGameCount}}队
                    </div>
                    <div>
                        当前等待队列:{{queueState}}
                    </div>
                    <br>
                    <div style="text-align:center;">
                        <el-button type="success" size="small"  @click="matching">{{matchtext}}</el-button>
                    </div>
                    <br>
                     <div style="text-align:center;">
                        <el-button type="warning" size="small"  @click="goHome">单人游戏</el-button>
                    </div>
                    <div v-show="pkResult">
                    上局PK结果:{{pkResult}}
                    </div>

                </div>
                <div v-else>
                     <div class="gamer">
                        <div class="center_box">
        
                            <div>
                                <h1 style="color:red;">{{startText}}</h1>
                            </div>
                            <div>我的分数:
                                <b style="color:green;">{{score}}</b>分
                            </div>
                            <div>对手分数:
                                <b style="color:green;">{{targetScore}}</b>分
                                <span class="over" v-if="this.status==this.statusEnum.over">(已结束)</span>
                            </div>
                            <div>倒计时:
                                <b style="color:blue">{{time}}</b>秒</div>
                                
                                <span class="tip" :style="{color:this.tipColor,visibility:this.tipShow}">点击开始,从9宫格中选择跟超越相关图片</span>
                                
                            <transition-group class="game_box" name="list-complete" tag="div">
                                <div v-for="(item) in items" :key="item.index" class="list-complete-item item">
                                    <img class="img" :src="item.src" @click='choseYcy(item)'>
                                </div>
                            </transition-group>
                        </div>
                        
                    </div>

                </div>
          
                
                
                
            </div>
            <audio  id="myaudio" ref="myaudio" preload="load" src="/static/mp3/comein.mp3">
            </audio>
            <audio id="myaudio" ref="myaudio" preload="load">
                <source src="/static/mp3/comein.mp3" type="audio/mp3" />
            </audio>
    </div>
</template>
<style lang="scss">
    ._pkhome{
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
            display: flex;
            flex-flow:column nowrap;
            align-items: center;
            // justify-content: center;

            .gamer {
                // border: 1px solid red;
                height: 100vh;
                width: 100%;
                display: flex;
                margin-top:60px;
                // align-items: center;
                justify-content: center; //垂直居中
                .center_box {
                    width: 300px; //  border:1px solid green;
                    display: flex;
                    flex-flow: column wrap; //横向排列,换行
                    align-items: center;
                    .nav {
                        width: inherit;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: space-between;
                        .logo_img {
                            height: 16px;
                            width: 16px;
                            display: inline-block;
                        }
                        .lev {
                            text-shadow: 2px 2px 2px rgba(252, 2, 2, 0.1);
                        }
                        .bangdan {
                            color: plum;
                            text-shadow: 2px 2px 2px rgba(252, 2, 2, 0.1);
                        }
                    }
                    .title {
                        height:auto;
                        // font-weight: 100;
                        // text-shadow: -1px 1px 0 rgba(0,0,0,.1);
                    }
                    .ps{
                        font-size:12px; 
                        -webkit-transform-origin-x: 0;
                        -webkit-transform: scale(0.90);
                    }
                    .ps_ie{
                        font-size:10.8px; 
                    }
                    .tip{
                        font-size:12px;
                        text-shadow: 2px 2px 2px rgba(252, 2, 2, 0.1);
                    }
                    .game_box {
                        // border: 1px solid green;
                        // width: 300px;
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
                    .over {
                        color: red;
                    }
                }

            }

        }
    }
</style>
<script>
    import apis from '../../apis/apis';
    export default{
        // name: 'pkhome',
        data (){
            return {
                websocket:null,//socket对象
                msg:'未连接',
                text:'',
                pid:process.env.NODE_ENV=='development'? this.$common.getGuid():returnCitySN["cip"],
                allCount:0,//当前房间总人数
                intoGameCount:0,//当前游戏中队数
                targetUser:'',//对手sid
                queueState:'无',//队列是否有人
                state:'离线',
                matchtext:'进入匹配',
                intoGame:false,//进入游戏
                socketMsg:{
                    fromSID:'',
                    toSID:'',
                    type:'',
                    msg:'',
                    data:'',
                },
                initScore: 0,//初始分数,开发用
                score: 0,//当前分数
                targetScore:0,//对手分数
                initTime: 10,//初始倒计时
                gameTime:60,//游戏时间60秒
                lastTime: 0,//上一次倒计时
                time: 0,//当前倒计时
                timer: null,
                levcolor:'',
                statusEnum: {
                    init: 'init',
                    starting: 'starting',
                    over: 'over'
                },
                status: 'init',//init,starting,over
                groupList: [//分组
                    {
                        index: 0,
                        itemList: [//每组图片
                            {
                                index: 0,
                                src: 'static/img/wazi/wazi0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/wazi/wazi1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/wazi/wazi2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/wazi/wazi3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/wazi/wazi4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/wazi/wazi5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/wazi/wazi6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/wazi/wazi7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/wazi/wazi8.jpg',
                                isycy: false
                            },
                        ]
                    },
                    {
                        index: 1,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/jiangpai/jiangpai0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/jiangpai/jiangpai1.jpg',
                                isycy: true
                            },
                            {
                                index: 2,
                                src: 'static/img/jiangpai/jiangpai2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/jiangpai/jiangpai3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/jiangpai/jiangpai4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/jiangpai/jiangpai5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/jiangpai/jiangpai6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/jiangpai/jiangpai7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/jiangpai/jiangpai8.jpg',
                                isycy: false
                            },
                        ]
                    },
                    {
                        index: 2,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/car/car0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/car/car1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/car/car2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/car/car3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/car/car4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/car/car5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/car/car6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/car/car7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/car/car8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 3,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/maozi/maozi0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/maozi/maozi1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/maozi/maozi2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/maozi/maozi3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/maozi/maozi4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/maozi/maozi5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/maozi/maozi6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/maozi/maozi7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/maozi/maozi8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 4,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/donghua/dh0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/donghua/dh1.jpg',
                                isycy: true
                            },
                            {
                                index: 2,
                                src: 'static/img/donghua/dh2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/donghua/dh3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/donghua/dh4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/donghua/dh5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/donghua/dh6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/donghua/dh7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/donghua/dh8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 5,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/zongyi/zy0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/zongyi/zy1.jpg',
                                isycy: true
                            },
                            {
                                index: 2,
                                src: 'static/img/zongyi/zy2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/zongyi/zy3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/zongyi/zy4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/zongyi/zy5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/zongyi/zy6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/zongyi/zy7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/zongyi/zy8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 6,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/yinliao/yinliao0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/yinliao/yinliao1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/yinliao/yinliao2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/yinliao/yinliao3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/yinliao/yinliao4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/yinliao/yinliao5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/yinliao/yinliao6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/yinliao/yinliao7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/yinliao/yinliao8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 7,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/xingge/xingge0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/xingge/xingge1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/xingge/xingge2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/xingge/xingge3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/xingge/xingge4.jpg',
                                isycy: true
                            },
                            {
                                index: 5,
                                src: 'static/img/xingge/xingge5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/xingge/xingge6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/xingge/xingge7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/xingge/xingge8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 8,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/dongwu/dongwu0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/dongwu/dongwu1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/dongwu/dongwu2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/dongwu/dongwu3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/dongwu/dongwu4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/dongwu/dongwu5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/dongwu/dongwu6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/dongwu/dongwu7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/dongwu/dongwu8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 9,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/jihua/jihua0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/jihua/jihua1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/jihua/jihua2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/jihua/jihua3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/jihua/jihua4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/jihua/jihua5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/jihua/jihua6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/jihua/jihua7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/jihua/jihua8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 10,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/niuzai/niuzai0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/niuzai/niuzai1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/niuzai/niuzai2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/niuzai/niuzai3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/niuzai/niuzai4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/niuzai/niuzai5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/niuzai/niuzai6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/niuzai/niuzai7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/niuzai/niuzai8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 11,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/shuiguo/shuiguo0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/shuiguo/shuiguo1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/shuiguo/shuiguo2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/shuiguo/shuiguo3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/shuiguo/shuiguo4.jpg',
                                isycy: true
                            },
                            {
                                index: 5,
                                src: 'static/img/shuiguo/shuiguo5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/shuiguo/shuiguo6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/shuiguo/shuiguo7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/shuiguo/shuiguo8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 12,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/xiaoshuo/xiaoshuo0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/xiaoshuo/xiaoshuo1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/xiaoshuo/xiaoshuo2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/xiaoshuo/xiaoshuo3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/xiaoshuo/xiaoshuo4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/xiaoshuo/xiaoshuo5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/xiaoshuo/xiaoshuo6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/xiaoshuo/xiaoshuo7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/xiaoshuo/xiaoshuo8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 13,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/shengri/shengri0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/shengri/shengri1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/shengri/shengri2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/shengri/shengri3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/shengri/shengri4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/shengri/shengri5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/shengri/shengri6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/shengri/shengri7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/shengri/shengri8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 14,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/yingyuan/yingyuan0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/yingyuan/yingyuan1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/yingyuan/yingyuan2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/yingyuan/yingyuan3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/yingyuan/yingyuan4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/yingyuan/yingyuan5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/yingyuan/yingyuan6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/yingyuan/yingyuan7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/yingyuan/yingyuan8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 15,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/dongwutwo/dongwutwo0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/dongwutwo/dongwutwo1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/dongwutwo/dongwutwo2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/dongwutwo/dongwutwo3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/dongwutwo/dongwutwo4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/dongwutwo/dongwutwo5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/dongwutwo/dongwutwo6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/dongwutwo/dongwutwo7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/dongwutwo/dongwutwo8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 16,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/shengao/shengao0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/shengao/shengao1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/shengao/shengao2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/shengao/shengao3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/shengao/shengao4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/shengao/shengao5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/shengao/shengao6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/shengao/shengao7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/shengao/shengao8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 17,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/maorong/maorong0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/maorong/maorong1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/maorong/maorong2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/maorong/maorong3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/maorong/maorong4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/maorong/maorong5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/maorong/maorong6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/maorong/maorong7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/maorong/maorong8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 18,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/xifashui/xifashui0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/xifashui/xifashui1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/xifashui/xifashui2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/xifashui/xifashui3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/xifashui/xifashui4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/xifashui/xifashui5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/xifashui/xifashui6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/xifashui/xifashui7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/xifashui/xifashui8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 19,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/faxing/faxing0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/faxing/faxing1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/faxing/faxing2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/faxing/faxing3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/faxing/faxing4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/faxing/faxing5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/faxing/faxing6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/faxing/faxing7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/faxing/faxing8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 20,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/wugong/wugong0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/wugong/wugong1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/wugong/wugong2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/wugong/wugong3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/wugong/wugong4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/wugong/wugong5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/wugong/wugong6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/wugong/wugong7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/wugong/wugong8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    {
                        index: 21,
                        itemList: [
                            {
                                index: 0,
                                src: 'static/img/cidian/cidian0.jpg',
                                isycy: true
                            },
                            {
                                index: 1,
                                src: 'static/img/cidian/cidian1.jpg',
                                isycy: false
                            },
                            {
                                index: 2,
                                src: 'static/img/cidian/cidian2.jpg',
                                isycy: false
                            },
                            {
                                index: 3,
                                src: 'static/img/cidian/cidian3.jpg',
                                isycy: false
                            },
                            {
                                index: 4,
                                src: 'static/img/cidian/cidian4.jpg',
                                isycy: false
                            },
                            {
                                index: 5,
                                src: 'static/img/cidian/cidian5.jpg',
                                isycy: false
                            },
                            {
                                index: 6,
                                src: 'static/img/cidian/cidian6.jpg',
                                isycy: false
                            },
                            {
                                index: 7,
                                src: 'static/img/cidian/cidian7.jpg',
                                isycy: false
                            },
                            {
                                index: 8,
                                src: 'static/img/cidian/cidian8.jpg',
                                isycy: false
                            },

                        ]
                    },
                    //   {
                    //     index: 22,
                    //     itemList: [
                    //         {
                    //             index: 0,
                    //             src: 'static/img/logo/logo0.jpg',
                    //             isycy: true
                    //         },
                    //         {
                    //             index: 1,
                    //             src: 'static/img/logo/logo1.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 2,
                    //             src: 'static/img/logo/logo2.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 3,
                    //             src: 'static/img/logo/logo3.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 4,
                    //             src: 'static/img/logo/logo4.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 5,
                    //             src: 'static/img/logo/logo5.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 6,
                    //             src: 'static/img/logo/logo6.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 7,
                    //             src: 'static/img/logo/logo7.jpg',
                    //             isycy: false
                    //         },
                    //         {
                    //             index: 8,
                    //             src: 'static/img/logo/logo8.jpg',
                    //             isycy: false
                    //         },

                    //     ]
                    // },
                ],
                initList: [
                    {
                        index: 0,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 1,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 2,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 3,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 4,
                        src: 'static/img/start.gif',//中间开始按钮
                        isycy: true
                    },
                    {
                        index: 5,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 6,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 7,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },
                    {
                        index: 8,
                        src: 'static/img/home.jpg',
                        isycy: true
                    },

                ],
                items: [],
                nextNum: 10,
                lev: 'L1萌新',
                lev_now: 'L1萌新',//游戏时的等级
                startTime: null,//100分开始计时
                endTime: null,//100分结束计时
                mintime: null,//100分比赛耗时ddddddddd
                tipColors:['#e96900','#42b983','#ae81ff','#2973b7','#7f8c8d'],//提示颜色
                tipColor:'',
                tipShow:'visible',//显示tip
                startText:3,
                pkTime:60,//设置PK倒计时数
                isgamestart:false,//游戏是否开始
                pkResult:'',
                isHomer:false,//房主
                }
           
        },
        mounted() {
            this.open();
            window.onbeforeunload=onbeforeunload;
            this.restart();
        },
        methods: {
            //初始化socket对象
            open(){

                //判断当前浏览器是否支持WebSocket
                if('WebSocket' in window){
                    if(process.env.NODE_ENV=='development'){
                        this.websocket = new WebSocket("ws://localhost:8001/websocket/"+this.pid);
                    }
                    else{
                        this.websocket = new WebSocket("ws://139.199.113.64:10001/websocket/"+this.pid);
                    }
                    
                    this.websocket.onopen  =this.onopen;
                    this.websocket.onerror =this.onerror;
                    this.websocket.onmessage =this.onmessage;
                    this.websocket.onclose =this.onclose;
                }
                else{
                    alert('Not support websocket');
                }
                
            },
            //连接成功建立的回调方法
            onopen(){
                this.setMessageInnerHTML("open");
            },
            //连接发生错误的回调方法
            onerror(){
                this.setMessageInnerHTML("error");
            },
            //接收到消息的回调方法
            onmessage(){
                var data = Object.assign({}, this.socketMsg);
                data=JSON.parse(event.data);
                //刷新总人数和在线状态
                if(data.type=='ALL_COUNT'){
                    if(data.data>this.allCount){
                        this.$nextTick(()=>{
                            this.$refs.myaudio.play();
                        });
                    }

                    this.allCount=data.data;
                    this.state="在线";
                    
                    
                    
                }
                //刷新队列状态
                else if(data.type=='QUEUE_STATE'){
                    this.queueState=data.data;
                }
                //刷新准备状态
                else if(data.type=='INTO_PREPARE'){
                    this.matchtext='已准备...';
                }
                //刷新游戏中数量
                else if(data.type=='INTO_GAME_COUNT'){
                    this.intoGameCount=data.data;
                }
                //开始游戏
                else if(data.type=='INTO_GAME'){
                    this.matchtext='游戏中...';
                    this.targetUser=data.toSID;
                    this.intoGame=true;//设置进入游戏
                    this.isHomer=data.isHomer;
                    this.$nextTick(()=>{
                       this.gamestart();
                    });
                    
                }
                else if(data.type=='FRESH_TARGET_SCORE'){
                    this.targetScore=data.data;
                }
                //游戏结束更新状态
                else if(data.type=='OUT_GAME'){
                    this.matchtext='进入匹配';
                }
            },
            //连接关闭的回调方法
            onclose(){
                this.setMessageInnerHTML("close");
            },
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            onbeforeunload(){
                if(this.websocket){
                    this.websocket.close();
                }
            },
            //将消息显示在网页上
            setMessageInnerHTML(msg){
                this.msg=msg;
            },
            //关闭连接
            closeWebSocket(){
                if(this.websocket){
                    this.websocket.close();
                }
                
            },
            //发送消息
            send(socketMsg){
                if(this.websocket){
                    var message = JSON.stringify(socketMsg);
                    this.websocket.send(message);
                }
                
            },
             goBack(){
                // this.$router.go(-1);
                var socketParam={
                        fromSID:this.pid,
                        toSID:'',
                        type:'CLOSE',
                        msg:'',
                        data:''
                    }
                    this.send(socketParam);
                    this.$router.replace({ path: "/bangnav" });
            },
            matching(){
                if(this.matchtext=='进入匹配'){
                    this.restart()
                    var socketParam={
                        fromSID:this.pid,
                        toSID:'',
                        type:'INTO_MATCHING',
                        msg:'',
                        data:''
                    }
                    this.send(socketParam);
                    //执行开始匹配
                    this.matchtext='匹配中...';
                }
                
            },
            //刷新图片
        shuffle: function(items) {

            this.randomIndex(items);//随机索引
            this.items = _.shuffle(items);
        },
        //重新开始
        restart() {
            this.status = this.statusEnum.init;
            this.score = this.initScore;
            this.time = this.initTime;
            this.items = this.initList;
            this.cleartimer();
        },
        //点击选择ycy
        choseYcy(item) {

            if (this.status == this.statusEnum.init && item.index != 4) {
                this.$message({ message: '请点击中间开始', type: "warn" })
            }
            else if (this.status == this.statusEnum.init && item.index == 4) {//点击了开始
                if(this.isgamestart==false){
                    this.$message({ message: '请等待倒计时', type: "warn" })
                    return;
                }

                this.startTime = new Date();//开始计时
                var items = this.choseItems();
                this.shuffle(items);
                this.$nextTick(() => {
                    this.start();
                    var loginLog = {
                        ip: returnCitySN["cip"],
                        city: this.$common.getCity(),
                        type: '开始一起来吸越PK赛'
                    };
                    apis.shiroApi.loginLog(loginLog);
                });

            }
            else if (this.status == this.statusEnum.starting) {//进行中
                if (item.isycy) {//如果选中ycy
                    this.score += 1;//分数加1
                    if (this.score == 50) {//如果分数达到100分
                        this.endTime = new Date();
                        this.mintime = this.endTime - this.startTime;
                    }
                     this.$message({ message: '正确', type: 'success' });
                     //正确就刷新到对方那里的分数
                    var param={
                        fromSID:this.pid,
                        toSID:this.targetUser,
                        type:'FRESH_TARGET_SCORE',
                        msg:'',
                        data:this.score,
                    }
                    this.send(param);
                }
                else {
                    //this.over();
                    this.$message({ message: '错误', type: "error" });
                }
                //刷新新题
                this.freshItems();
            }
            else {
                this.$message({ message: 'game over!吸越得分:' + this.score + '分', type: "error" })
            }

        },
        freshItems(){
            var items = this.choseItems();
            this.shuffle(items);
            this.$nextTick(() => {
                this.running();
            });
        },
        //随机选择items
        choseItems() {
            var groupCount = this.groupList.length;

            var groupIndex = this.random(0, groupCount - 1);
            //groupIndex=14;
            var item = this.groupList[groupIndex];
            return item.itemList;
        },
        start() {
            this.starttimer();
            this.status = this.statusEnum.starting;
        },
        gamestart(){
            this.startText=3;
            this.isgamestart=false;
             var timer = setInterval(() => {
          
                var n=this.startText-1;

                if(n==0&&this.isgamestart==false){
                    this.startText='Go';
                    this.isgamestart=true;
                }
                else if(n==0&&this.isgamestart==true){
                    //结束游戏
                    clearInterval(timer);
                    this.intoGame=false;
                    this.over();
                    if(this.isHomer){//如果是房主,则结束游戏
                         var socketParam={
                            fromSID:this.pid,
                            toSID:'',
                            type:'GAME_OVER',
                            msg:'',
                            data:''
                         };
                        this.send(socketParam);
                    }
                }
                else if(this.startText=='Go'){
                    this.startText=this.pkTime;
                }
                else{
                    this.startText=n;
                }
                
               

             }, 1000);
        },
        running() {
            this.resettimer();
        },
        over() {
            this.cleartimer();
            this.status = this.statusEnum.over;
            var myScore=this.score;
            var targetScore=this.targetScore;
            var strTip="";
            if(myScore>targetScore){
                strTip="恭喜你,胜利!";
            }
            else if(myScore<targetScore){
                strTip="很遗憾,挑战失败!";
            }
            else{
                strTip="缘分呐,打成平局!";
            }
            this.$message({ message: strTip+"得分 "+myScore+"："+targetScore, type: "error" });
            this.pkResult=strTip+"得分 "+myScore+":"+targetScore;
            var ycyScore = {
                ip: returnCitySN["cip"],
                city: this.$common.getCity(),
                score: this.score,
                mintime: this.mintime,
            };
            apis.shiroApi.addYcyScore(ycyScore).then(() => {
                //this.freshLev();
            });
            this.isgamestart=false;

        },
        //开始计时
        starttimer(isTieFen) {
            var second = 1000;
            if (isTieFen) {
                second = 1800;
            }
            this.timer = setInterval(() => {
                this.time -= 1;
                if (this.time == 0) {
                    //this.over();
                    //刷新新题
                    this.freshItems();
                }

            }, second);
        },//重置计时
        resettimer() {

            var lev_new = this.$common.getYcyLev(this.score);//获取新的段位
            if (lev_new != this.lev_now) {
                //等级变化,改变时间等级
                // this.time = this.$common.getTimeLev(this.score);
                this.time=10;//固定10秒
                this.lastTime = this.time;
            }
            else {
                this.time = this.lastTime;
            }

            this.cleartimer();

            var isTieFen = false;
            lev_new=='Lv8铁粉' && (isTieFen = true)
            this.starttimer(isTieFen);

        },
        //清除计时
        cleartimer() {
            clearInterval(this.timer);
        },
        //查看榜单
        bangdan() {
        
            this.$router.push({ path: "/bangnav" });
        },
        bangdan_speed(){
            this.$router.push({ path: "/speedbang" });
        },
        //查看榜单
        liuyan() {
            this.$router.push({ path: "/liuyan" });
        },
        notice(){
             //this.$message({ message: '谢谢支持', type: 'success' });
        },
        //生成随机数
        random(minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
        //对items随机索引
        randomIndex(items) {
            var indexs = [];//索引集合
            for (var i = 0; i < 9; i++) {
                indexs.push(i);
            }
            for (var i = 8; i >= 0; i--) {
                var n = this.random(0, i);
                var index = indexs[n];//随机选择一个索引
                items[i].index = index;
                indexs.splice(n, 1);
            }
        },
        freshLev() {
            apis.shiroApi.queryScore({ ip: returnCitySN["cip"] })
                .then((data) => {
                    // console.log(JSON.stringify(data) );
                    if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {

                            var score = json.data;
                            this.lev = this.$common.getYcyLev(score);
                            this.levcolor=this.$common.getLevColor(score);
                        }
                        else if (json.message) {
                            this.$message({ message: json.message, type: "error" });
                        }
                    }
                })
                .catch((err) => {
                    this.listLoading = false;
                    this.$message({ message: '查询异常，请重试', type: "error" });
                });
        },
        changeTip(){
             //tip颜色切换,5s后消失
            var i=0;
            var tipTimer = setInterval(() => {
                if(i<this.tipColors.length){
                    this.tipColor=this.tipColors[i];
                    i++;
                }
                else{
                    clearInterval(tipTimer);
                    this.tipShow='hidden';
                }
            }, 1300);
        },
        //展示个人信息
        showPersonInfo(){
            var loginLog = {
                    ip: returnCitySN["cip"],
                    city: this.$common.getCity(),
                    type:'查询个人信息'
                };
                apis.shiroApi.loginLog(loginLog);

            //01:查询高分榜
              apis.shiroApi.queryRank({ip:returnCitySN["cip"]})
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var rank=json.data;
                            this.setPersonInfo('高分榜','rank',rank+'名')
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
             apis.shiroApi.queryScore({ip:returnCitySN["cip"]})
            .then((data)=>{
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var score=json.data;
                            this.setPersonInfo('高分榜','score',score+'分')
                            var lev=Vue.prototype.$common.getYcyLev(score);
                            this.setPersonInfo('高分榜','lev',lev+'段位')
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
            //02:查询总分榜
              apis.shiroApi.queryRankTotal({ip:returnCitySN["cip"]})
            .then((data)=>{
                // console.log(JSON.stringify(data) );
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var rank=json.data;
                            this.setPersonInfo('总分榜','rank',rank+'名')
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
             apis.shiroApi.queryScoreTotal({ip:returnCitySN["cip"]})
            .then((data)=>{
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var score=json.data;
                            this.setPersonInfo('总分榜','score',score+'分')
                            var lev=Vue.prototype.$common.getYcyTotalLev(score).replace('|','');
                            this.setPersonInfo('总分榜','lev',lev)
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
            //03:查询今日高分榜
               apis.shiroApi.queryRankToday({ip:returnCitySN["cip"]})
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var rank=json.data;
                            this.setPersonInfo('今日榜','rank',rank+'名')
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
             apis.shiroApi.queryTodayScore({ip:returnCitySN["cip"]})
            .then((data)=>{
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            var score=json.data;
                            this.setPersonInfo('今日榜','score',score+'分')
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        goHome(){
            var socketParam={
                        fromSID:this.pid,
                        toSID:'',
                        type:'CLOSE',
                        msg:'',
                        data:''
                    }
                    this.send(socketParam);
            this.$router.replace({ path: "/ttcy" });
        }
        },
    }
</script>