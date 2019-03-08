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
                    <div >
                        <el-button type="success" round @click="shuffle">吸越</el-button>
                    </div>
                    <transition-group name="list-complete" tag="div" class="game_box">
                    
                    <div v-for="item in items" v-bind:key="item" class="list-complete-item item">
                        <img class="img" src="static/img/img.jpg" alt="">
                    </div>
                </transition-group>
                </div>
                

                <!-- <div class="cbox">
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                    <div class="item">
                        <img class="img" src="static/img/ycy.jpg" alt="">
                    </div>
                </div> -->

        </div>

    </div>
</template>
<style lang="scss">
._ttcy {

    .outer {
        border: 1px solid red;
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;//垂直居中
        .center_box{
             display: flex;
             flex-flow: column wrap; //横向排列,换行
             align-items: center;
            .game_box {
                // border: 1px solid green;
                width: 300px;
                display: flex;
                flex-flow: row wrap; //横向排列,换行
                justify-content: center;
                .item{
                    border: 1px solid green;
                    flex:0 0 80px;//每个固定80像素
                    .img{
                        width: 100%;
                        height: 100%;
                    }
                }
                
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

export default {
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10
        }
    },
    methods: {
        shuffle: function() {
            this.items = _.shuffle(this.items)
        }
    }

}
</script>


