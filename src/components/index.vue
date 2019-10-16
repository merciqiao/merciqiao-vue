<template>
  <div>
    公告：
    <br />大吉大利~
    <br />
    <br />使用文档：
    <br />------------------
    <br />百度网盘：<a href="https://pan.baidu.com/s/1pjXdHqlJOkrXXZ_RwlEoOg" target="_blank">https://pan.baidu.com/s/1pjXdHqlJOkrXXZ_RwlEoOg</a>，提取码：pvrw
    <br />
    <br />版本说明:
    <br />------------------
    <br />功能版:101ycy.com:6001,此版本菜单和权限在"系统管理"页可配置
             (或https://101ycy.com:6011)
    <br />精简版:101ycy.com:6002,此版本菜单和权限在前端代码里配置
    <br />Mock版:101ycy.com:6005,此版本无权限,菜单在前端代码写死
    <br />
    <br />git仓库地址
    <br />------------------
    <br />功能版git:https://github.com/merciqiao/merciqiao-vue.git
    <br />精简版git:https://github.com/merciqiao/vuejiaoxue.git
    <br />
     <br />
    答疑解惑
    <br />------------------
    <br /><span style="color:red;">有问题可在页底加群问我</span>
    <br />★ 赞助★ 请点击右上角admin处
    

    
    <br />
    <br />
作者打卡:2019-10-16
    <br />

    <br />
    <el-button type="warning" @click="rollBackTables">如果菜单异常,点此恢复数据</el-button>
    <el-button type="warning" @click="openZanZhu">赞助</el-button>
    <br />
    <br />
PS:烦请修改了数据的用户,记得恢复下数据
    <!-- 扫码 start -->
    <!-- <div class="hongbao_zanzhu">
      扫码支持一下~
      <img class='hongbao' src="static/img/hongbao.png">
    </div>-->
    <!-- 扫码 end -->

    <br />
    <br />
      非常感谢
    <br />
    ------------------
    <br />
    <div class="zanzhulist">
      <table class="zanzhutb">
        <tr><td>爱丽丝的疯帽子：</td><td>赞助20元</td><td>2019-10-16</td></tr>
        <tr><td>壹克拉眼泪：</td><td>赞助20元</td><td>2019-10-06</td></tr>
        <tr><td>Liu月：</td><td>赞助1元</td><td>2019-9-27</td></tr>
        <tr><td>无忧：</td><td>赞助30元</td><td>2019-9-25</td></tr>
        <tr><td>懒是原罪：</td><td>赞助15元</td><td>2019-9-6</td></tr>
        <tr><td>河北：</td><td>赞助0.8元</td><td>2019-9-6</td></tr>
        <tr><td>武汉-后端-星空：</td><td>赞助1元</td><td>2019-9-6</td></tr>
        <tr><td>珠海-全栈-全干：</td><td>赞助5元</td><td>2019-9-6</td></tr>
        <tr><td>深圳-杜雪：</td><td>赞助5元</td><td>2019-9-6</td></tr>
        <tr><td>深圳-前端-亲亲：</td><td>赞助2.22元</td><td>2019-9-6</td></tr>
        <tr><td>北京-我乖你给我买街：</td><td>赞助0.55元</td><td>2019-9-6</td></tr>
        <tr><td>卖提莫的小男孩：</td><td>赞助5元</td><td>2019-9-6</td></tr>
        <tr><td>命：</td><td>赞助10元</td><td>2019-9-2</td></tr>
        <tr><td>顺势而为：</td><td>赞助100元</td><td>2019-9-1</td></tr>
        <tr><td>顺势而为：</td><td>赞助2元</td><td>2019-8-25</td></tr>
        <tr><td>*商：</td><td>赞助1元</td><td>2019-8-19</td></tr>
        <tr><td>苏州-前端-离愁：</td><td>赞助50元</td><td>2019-8-13</td></tr>
      </table>
    </div>
  </div>
</template>
<style>
.hongbao_zanzhu {
  display: block;
  position: fixed;
  text-align: center;
  bottom: 336px;
  width: 230px;
  right: 0;
  font-size: 23px;
  color: #505458;
}
.hongbao {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 330px;
  width: 230px;
}
.zanzhulist{
  border:1px dashed gray;
  display: inline-block;
}
.zanzhutb  tr td:first-child{
  text-align: right;
}
.zanzhutb  tr td:nth-child(2){
  width:80px;
}
</style>
<script>
import apis from "../apis/apis";
export default {
  methods: {
    rollBackTables() {
      var text = "数据还原";
      apis.shiroApi
        .rollBackTables()
        .then(data => {
          var alertText = "";
          if (data.data.status == "SUCCESS") {
            text += "成功";
            alertText = text + ",请重新登陆";
          } else {
            text += "失败";
            alertText = text + ",请重试";
          }
          this.$alert(alertText, "提示", {
            confirmButtonText: "确定"
          });
          log(text);
        })
        .catch(e => {
          this.$alert("数据还原异常,请重试", "提示", {
            confirmButtonText: "确定"
          });
          text += "失败";
          log(text);
        });
      console.log(text);

      function log(text) {
        var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-" + text
        };

        apis.shiroApi.loginLog(loginLog);
      }
    },
    openZanZhu(){
      this.$common.OpenNewPage(this,'zanzhu');
    }
  }
};
</script>
