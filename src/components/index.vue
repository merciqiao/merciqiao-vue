<template>
  <div>
     公告：
     <br>
     大吉大利~
     <br>
      <br>
     最新动态:功能版使用文档已经更新了,在"基础模块"->"使用文档"页->使用文档记录->详情
     <br>
     &#12288;&#12288;&#12288;&#12288; 文档持续更新中...
     <br>
     <br>
     git:https://github.com/merciqiao/merciqiao-vue.git
     <br>
     <br>
     内容持续更新中...
     <br>
     ------------------
     <br>
    版本说明:
     <br>
     功能版:101ycy.com:6001,此版本菜单和权限在"系统管理"页可配置
     <br>
     精简版:101ycy.com:6002,此版本菜单和权限在前端代码里配置
     <br>
     Mock版:101ycy.com:6005,此版本无权限,菜单在前端代码写死
     <br>
     <br>
     详情可在页底加群问我
     <br>
     <br>
     ★ 赞助★ 请点击右上角admin处
      <br>
      <br>
     作者打卡:2019-6-3
      
    <br>
   
    <br>
    <el-button type="warning"  @click="rollBackTables"> 如果菜单异常,点此恢复数据</el-button>

    <br>
    <br>
     PS:烦请修改了数据的用户,记得恢复下数据



     <!-- 扫码 start -->
     <!-- <div class="hongbao_zanzhu">
      扫码支持一下~
      <img class='hongbao' src="static/img/hongbao.png">
     </div> -->
     <!-- 扫码 end -->
  </div>
</template>
<style>
  .hongbao_zanzhu{
    display: block;
    position:fixed;
    text-align: center;
    bottom: 336px;
    width:230px;
    right: 0;
    font-size: 23px;
    color: #505458;
  }
  .hongbao{
    position:fixed;
    bottom: 0;
    right: 0;
    height:330px;
    width:230px;
  }
</style>
<script>
import apis from '../apis/apis';
export default {
  methods:{
     rollBackTables() {
            var text = '数据还原';
            apis.shiroApi.rollBackTables()
                .then(data => {
                    var alertText='';
                    if(data.data.status=='SUCCESS'){
                        text += '成功';
                        alertText=text+',请重新登陆';
                    }
                    else{
                        text += '失败';
                        alertText=text+',请重试';
                    }
                    this.$alert(alertText, '提示', {
                        confirmButtonText: '确定',
                    });
                    log(text);
                })
                .catch(e => {
                    this.$alert('数据还原异常,请重试', '提示', {
                        confirmButtonText: '确定',
                    });
                    text += '失败';
                    log(text);
                });
            console.log(text);

            function log(text){
                 var loginLog = {
                ip: returnCitySN["cip"],
                city: returnCitySN["cname"] + '-' + text
            };

            apis.shiroApi.loginLog(loginLog);
            }
           
        }
  }
}
</script>
