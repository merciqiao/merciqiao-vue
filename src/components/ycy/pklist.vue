<template>
    <div>
        <el-button type="success"  @click="open">连接</el-button>
        <el-button type="success"  @click="send">发送</el-button>
        <el-button type="success"  @click="closeWebSocket">关闭</el-button>
        <el-input id="text" v-model='text' type="text" />
        <div id="message">
        {{msg}}
        </div>
    </div>
       
</template>
<script>
    export default{
        data (){
            return {
                websocket:null,//socket对象
                msg:'未连接',
                text:'',
                pid:this.$common.getGuid(),
            }
           
        },
        mounted() {
            window.onbeforeunload=onbeforeunload;
        },
        methods: {
            //初始化socket对象
            open(){

                //判断当前浏览器是否支持WebSocket
                if('WebSocket' in window){
                    this.websocket = new WebSocket("ws://localhost:8001/websocket/"+this.pid);
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
                this.setMessageInnerHTML(event.data);
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
            send(){
                if(this.websocket){
                    var message = this.text;
                    this.websocket.send(message);
                }
                
            },
        },
    }
</script>
