<template>
  <div>
    <video src="http://101ycy.com:6001/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E4%BD%BF%E7%94%A8%E6%BC%94%E7%A4%BA.mp4" controls="controls">您的浏览器不支持 video 标签。</video>
  </div>
</template>

<script>
import apis from '../../apis/apis'
export default {
  mounted() {
     var loginLog = {
                ip: returnCitySN["cip"],
                city: returnCitySN["cname"] + '-' + '进入演示页面'
            };

            apis.shiroApi.loginLog(loginLog);
  },
};
</script>

<style>
</style>