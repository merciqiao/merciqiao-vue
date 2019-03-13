<template>
    <div class="_ttcy">
        <!-- <div id="list-complete-demo" class="demo">
                <button v-on:click="shuffle">Shuffle</button>
                <transition-group name="list-complete" tag="p">
                    <span v-for="item in items" v-bind:key="item" class="list-complete-item">
                        {{ item }}
                    </span>
                </transition-group>
            </div> -->
        <div class="outer">
                <div class="center_box">
                    <div class="nav">
                        <div class="lev">{{lev}}</div>
                        
                             <!-- <div class="logo_img">
                                <img style="width:100%;height:100%;" src="static/img/bangdan.jpg">
                             </div> -->
                        
                       
                        <div class="bangdan" @click="bangdan">
                            
                            吸越榜
                            
                            </div>
                    </div>
                    <div class="title">大家一起来吸越</div><br/>
                    
                    <div >
                        <el-button type="success" round @click="restart">重新吸越</el-button>
                    </div><br/>
                    <div>吸越分数:<b style="color:green;">{{score}}</b>分 <span class="over" v-if="this.status==this.statusEnum.over">(已结束)</span></div>
                    <div>倒计时:<b style="color:blue">{{time}}</b>秒</div><br/>
                    <transition-group class="game_box" name="list-complete" tag="div" >
                    
                    <div v-for="(item) in items" :key="item.index" class="list-complete-item item">
                        <!-- <img class="img" src="static/img/img.jpg" alt=""> -->
                        <img class="img" :src="item.src" @click='choseYcy(item)'>
                    </div>
                </transition-group>
                </div>
                

                <!-- <div class="cbox">
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                </div> -->

        </div>

    </div>
</template>
<style lang="scss">
._ttcy {

    .outer {
        // border: 1px solid red;
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;//垂直居中
        .center_box{
             width:300px;
            //  border:1px solid green;
             display: flex;
             flex-flow: column wrap; //横向排列,换行
             align-items: center;
             .nav{
                width:inherit;
                display: flex;
                flex-flow: row  nowrap;
                justify-content:space-between;
                .logo_img{
                        height:16px;
                        width:16px;
                        display: inline-block;
                    }
                .lev{
                    
                }
                .bangdan{
                    color:plum;
                    text-shadow: 2px 2px 2px  rgba(252, 2, 2, 0.1);
                    
                }
            }
            .title{
                // font-weight: 100;
                // text-shadow: -1px 1px 0 rgba(0,0,0,.1);
            }
            .game_box {
                // border: 1px solid green;
                // width: 300px;
                display: flex;
                flex-flow: row wrap; //横向排列,换行
                justify-content: center;
                .item{
                    border: 1px solid green;
                    flex:0 0 98px;//每个固定80像素
                    height:98px;
                    width:98px;
                    .img{
                        width: 100%;
                        height: 100%;
                    }
                }
                
            }
            .over{
                color:red;
            }
            
            
        }
    }
}

.list-complete-item {
    transition: all 1s;
    display: inline-block;
    // margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}

</style>
<script>
import apis from '../../apis/apis';
export default {
    data() {
        return {
            initScore:0,//初始分数,开发用
            score:0,//当前分数
            initTime:8,//初始倒计时
            lastTime:0,//上一次倒计时
            time:0,//当前倒计时
            timer:null,
            statusEnum:{
                init:'init',
                starting:'starting',
                over:'over'
            },
            status:'init',//init,starting,over
            groupList:[//分组
                {
                    index:0,
                    itemList:[//每组图片
                            {
                                index:0,
                                src:'static/img/wazi/wazi0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/wazi/wazi1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/wazi/wazi2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/wazi/wazi3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/wazi/wazi4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/wazi/wazi5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/wazi/wazi6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/wazi/wazi7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/wazi/wazi8.jpg',
                                isycy:false
                            },  
                    ]
                },
                {
                    index:1,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/jiangpai/jiangpai0.jpg',
                                isycy:true
                            },
                             {
                                index:1,
                                src:'static/img/jiangpai/jiangpai1.jpg',
                                isycy:true
                            },
                            {
                                index:2,
                                src:'static/img/jiangpai/jiangpai2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/jiangpai/jiangpai3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/jiangpai/jiangpai4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/jiangpai/jiangpai5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/jiangpai/jiangpai6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/jiangpai/jiangpai7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/jiangpai/jiangpai8.jpg',
                                isycy:false
                            },      
                    ]
                },
                {
                    index:2,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/car/car0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/car/car1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/car/car2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/car/car3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/car/car4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/car/car5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/car/car6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/car/car7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/car/car8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                {
                    index:3,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/maozi/maozi0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/maozi/maozi1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/maozi/maozi2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/maozi/maozi3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/maozi/maozi4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/maozi/maozi5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/maozi/maozi6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/maozi/maozi7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/maozi/maozi8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                 {
                    index:4,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/donghua/dh0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/donghua/dh1.jpg',
                                isycy:true
                            },
                            {
                                index:2,
                                src:'static/img/donghua/dh2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/donghua/dh3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/donghua/dh4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/donghua/dh5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/donghua/dh6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/donghua/dh7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/donghua/dh8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:5,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/zongyi/zy0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/zongyi/zy1.jpg',
                                isycy:true
                            },
                            {
                                index:2,
                                src:'static/img/zongyi/zy2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/zongyi/zy3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/zongyi/zy4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/zongyi/zy5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/zongyi/zy6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/zongyi/zy7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/zongyi/zy8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:6,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/yinliao/yinliao0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/yinliao/yinliao1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/yinliao/yinliao2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/yinliao/yinliao3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/yinliao/yinliao4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/yinliao/yinliao5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/yinliao/yinliao6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/yinliao/yinliao7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/yinliao/yinliao8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                 {
                    index:7,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/xingge/xingge0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/xingge/xingge1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/xingge/xingge2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/xingge/xingge3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/xingge/xingge4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/xingge/xingge5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/xingge/xingge6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/xingge/xingge7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/xingge/xingge8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:8,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/dongwu/dongwu0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/dongwu/dongwu1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/dongwu/dongwu2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/dongwu/dongwu3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/dongwu/dongwu4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/dongwu/dongwu5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/dongwu/dongwu6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/dongwu/dongwu7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/dongwu/dongwu8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:9,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/jihua/jihua0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/jihua/jihua1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/jihua/jihua2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/jihua/jihua3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/jihua/jihua4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/jihua/jihua5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/jihua/jihua6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/jihua/jihua7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/jihua/jihua8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:10,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/niuzai/niuzai0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/niuzai/niuzai1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/niuzai/niuzai2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/niuzai/niuzai3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/niuzai/niuzai4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/niuzai/niuzai5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/niuzai/niuzai6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/niuzai/niuzai7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/niuzai/niuzai8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:11,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/shuiguo/shuiguo0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/shuiguo/shuiguo1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/shuiguo/shuiguo2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/shuiguo/shuiguo3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/shuiguo/shuiguo4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/shuiguo/shuiguo5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/shuiguo/shuiguo6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/shuiguo/shuiguo7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/shuiguo/shuiguo8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                 {
                    index:12,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/xiaoshuo/xiaoshuo0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/xiaoshuo/xiaoshuo1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/xiaoshuo/xiaoshuo2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/xiaoshuo/xiaoshuo3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/xiaoshuo/xiaoshuo4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/xiaoshuo/xiaoshuo5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/xiaoshuo/xiaoshuo6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/xiaoshuo/xiaoshuo7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/xiaoshuo/xiaoshuo8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                  {
                    index:13,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/shengri/shengri0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/shengri/shengri1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/shengri/shengri2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/shengri/shengri3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/shengri/shengri4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/shengri/shengri5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/shengri/shengri6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/shengri/shengri7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/shengri/shengri8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
                 {
                    index:14,
                    itemList:[
                         {
                                index:0,
                                src:'static/img/yingyuan/yingyuan0.jpg',
                                isycy:true
                            },
                            {
                                index:1,
                                src:'static/img/yingyuan/yingyuan1.jpg',
                                isycy:false
                            },
                            {
                                index:2,
                                src:'static/img/yingyuan/yingyuan2.jpg',
                                isycy:false
                            },
                            {
                                index:3,
                                src:'static/img/yingyuan/yingyuan3.jpg',
                                isycy:false
                            },
                            {
                                index:4,
                                src:'static/img/yingyuan/yingyuan4.jpg',
                                isycy:false
                            },
                            {
                                index:5,
                                src:'static/img/yingyuan/yingyuan5.jpg',
                                isycy:false
                            },
                            {
                                index:6,
                                src:'static/img/yingyuan/yingyuan6.jpg',
                                isycy:false
                            },  
                             {
                                index:7,
                                src:'static/img/yingyuan/yingyuan7.jpg',
                                isycy:false
                            },
                            {
                                index:8,
                                src:'static/img/yingyuan/yingyuan8.jpg',
                                isycy:false
                            },
                                 
                    ]
                },
            ],
            initList:[ 
                {
                                index:0,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                 {
                                index:1,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                            {
                                index:2,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                            {
                                index:3,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                            {
                                index:4,
                                src:'static/img/start.jpg',
                                isycy:true
                            },
                            {
                                index:5,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                            {
                                index:6,
                                src:'static/img/home.jpg',
                                isycy:true
                            },  
                             {
                                index:7,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
                            {
                                index:8,
                                src:'static/img/home.jpg',
                                isycy:true
                            },
    
            ],
            items: [],
            nextNum: 10,
            lev:'L1萌新',
            lev_now:'L1萌新',//游戏时的等级
            startTime:null,//100分开始计时
            endTime:null,//100分结束计时
            mintime:null,//100分比赛耗时ddddddddd
            
        }
    },
    mounted(){
        var count=1000;
        this.lastTime=this.initTime;
        var formLogin= {  
                loginName: 'admin',
                password: '123456'
            }
        //apis.shiroApi.loginIn(formLogin);
        this.restart();
         var loginLog = {
                ip: returnCitySN["cip"],
                city: this.$common.getCity(),
                type:'进入一起来吸越'
            };
        apis.shiroApi.loginLog(loginLog);
        this.freshLev();
    },
    methods: {
        //刷新图片
        shuffle: function(items) {
            
            this.randomIndex(items);//随机索引
            this.items = _.shuffle(items);
        },
        //重新开始
        restart(){
            this.status=this.statusEnum.init;
            this.score=this.initScore;
            this.time=this.initTime;
            this.items=this.initList;
            this.cleartimer();
        },
        //点击选择ycy
        choseYcy(item){
            
            if(this.status==this.statusEnum.init&&item.index!=4){
                this.$message({message: '请点击中间开始',type: "warn"})
            }
            else if(this.status==this.statusEnum.init&&item.index==4){//点击了开始
                this.startTime=new Date();//开始计时
                var items=this.choseItems();
                this.shuffle(items);
                this.$nextTick(()=>{
                    this.start();
                    var loginLog = {
                        ip: returnCitySN["cip"],
                        city: this.$common.getCity(),
                        type:'开始一起来吸越'
                    };
                    apis.shiroApi.loginLog(loginLog);
                });
                
            }
            else if(this.status==this.statusEnum.starting){//进行中
                if(item.isycy){//如果选中ycy
                    this.score+=1;//分数加1
                    if(this.score==100){//如果分数达到100分
                        this.endTime=new Date();
                        this.mintime=this.endTime-this.startTime;
                    }
                    var items=this.choseItems();
                    this.shuffle(items);
                    this.$nextTick(()=>{
                        this.running();
                    });
                    
                }
                else{
                    this.over();
                }
            }
            else{
                this.$message({message: 'game over!吸越得分:'+this.score+'分',type: "error"})
            }
            
        },
        //随机选择items
        choseItems(){
            var groupCount=this.groupList.length;
            
            var groupIndex=this.random(0,groupCount-1);
            //groupIndex=14;
            var item=this.groupList[groupIndex];
            return item.itemList;
        },
        start(){
            this.starttimer();
            this.status=this.statusEnum.starting;
        },
        running(){
            this.resettimer();
        },
        over(){
            this.cleartimer();
            this.status=this.statusEnum.over;
            
            this.$message({message: 'game over!吸越得分:'+this.score+'分',type: "error"});
                var ycyScore={
                    ip:returnCitySN["cip"],
                    city:this.$common.getCity(),
                    score:this.score ,
                    mintime:this.mintime,               
                };
                apis.shiroApi.addYcyScore(ycyScore).then(()=>{
                    this.freshLev();
                });

        },
        //开始计时
        starttimer(isTieFen){
            var second=1000;
            if(isTieFen){
                second=1800;
            }
            this.timer=setInterval(()=>{
                this.time-=1;
                if(this.time==0){
                    this.over();
                }
                
            },second);
        },//重置计时
        resettimer(){
            
            var lev_new=this.$common.getYcyLev(this.score);//获取新的段位
            if(lev_new!=this.lev_now){
                //等级变化,改变时间等级
                this.time=this.$common.getTimeLev(this.score);
                this.lastTime=this.time;
            }
            else{
                this.time=this.lastTime;
            }
            
            this.cleartimer();
            
            var isTieFen=false;
            lev_new && (isTieFen=true)
            this.starttimer(isTieFen);
            
        },
        //清除计时
        cleartimer(){
            clearInterval(this.timer);
        },
        //查看榜单
        bangdan(){
            //window.location.href='/bang';
            this.$router.push({ path: "/bang" });
            //this.$common.OpenNewPage(this,'bang');
        },
        //生成随机数
        random(minNum,maxNum){
                switch(arguments.length){ 
                case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                break; 
                case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                break; 
                    default: 
                        return 0; 
                    break; 
            } 
        },
        //对items随机索引
        randomIndex(items){
            var indexs=[];//索引集合
            for(var i=0;i<9;i++){
                indexs.push(i);
            }
            for(var i=8;i>=0;i--){
                var n= this.random(0,i);
                var index=indexs[n];//随机选择一个索引
                items[i].index=index;
                indexs.splice(n,1);
            }
        },
        freshLev(){
             apis.shiroApi.queryScore({ip:returnCitySN["cip"]})
            .then((data)=>{
                // console.log(JSON.stringify(data) );
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            
                            var score=json.data;
                            this.lev=this.$common.getYcyLev(score);
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
        }
    }

}
</script>


