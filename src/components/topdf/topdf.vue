<template>
  <div style="overflow:auto;height:100%;">
    <div>图片打印页,仅供学习参考</div>
     <div>
      <a v-show="false" ref="adownload" :href="imgurl" download="图片文件名">下载图片</a>
      <el-button type="primary" @click="download">下载图片</el-button>
    </div>
    <div ref="capture" id="capture" class="capture">
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
       <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
       <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
       <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
       <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
       <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <div>
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/img/zhifubao1.jpg" />
      </div>
      <!-- <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div>
       <div v-show="true">
        <div style="color:red;border:1px solid red;">这是要打印的内容</div>
        <img src="static/imgtest/logo_pingan.bmp" />
        <img src="static/imgtest/pingan_yinzhang.gif" />
      </div> -->
    </div>
   
  </div>
</template>

<style>
/* 脱离文档流,并移除可视区域 */
.capture{
  /* position: absolute;
  left:-2000px; */
  width:500px;
}
</style>
<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      myhtml: "<div>需要生成PDF的html</div>",
      imgurl: ""
    };
  },
  mounted() {},
  methods: {
    download() {
      html2canvas(this.$refs.capture).then(canvas => {
        this.imgurl = canvas.toDataURL();
        this.$nextTick(() => {
          this.$refs.adownload.click();
        });
      });
    }
  }
};
</script>

<style>
</style>