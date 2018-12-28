<template>
  <div>
     公告：默认青铜级账号，想获取高级权限账号，请从页底加群，群公告内有白银级账号^_^

     <br>
     <br>
     内容持续更新中...
     <br>
     ------------------
     <br>
     2018-11-18
     <br>
     更新：
     <br>
     1.添加建议留言页
     <br>
      ------------------
     <br>
     2018-12-7
     <br>
     更新：
     <br>
     1.移除redis缓存,因为服务器内存小,redis不稳定
     <br>
     2.新用户登陆,刷新报404问题
     <br>
      ------------------
     <br>
     2018-12-22
     <br>
     更新：
     <br>
     1.修复了日期控件的BUG
     <br>
     2.新增了完整的增删改查页
     <br>
     3.增加了免费扫红包，扫一下就能支持我
     <br>
      ------------------
     <br>
     2018-12-25 (白银级)
     <br>
     更新：
     <br>
     1.增加了新页面打开并传参demo,适用于从列表打开详情页








     <!-- 扫码 start -->
     <div class="hongbao_zanzhu">
      扫码支持一下~
      <img class='hongbao' src="static/img/hongbao.png">
     </div>
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