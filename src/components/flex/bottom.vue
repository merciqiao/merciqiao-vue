<template>
<div class="outer">
    <div class="flexContainer">
    <header class="head">
        flex布局实现页底永远在底部
    </header>
    <main class="main"> 
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
       <br>
        <!-- <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
         <br>
       这是内容区
        <br>
         这是内容区
      
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>
       这是内容区
        <br>
         这是内容区
        <br>  -->
    </main>
    <footer class="footer">
        这是页底
    </footer>
</div>
</div>

</template>
<style scoped>
    .outer{
        position: absolute;
        top:0;
        bottom: 0;
        width:100%;
        overflow: scroll;
    }
    .flexContainer{
        display:flex;
        flex-direction: column;
        height:100%;
    }
    .head{
        border:1px solid green;
        flex:0 0 60px;
    }
    .main{
        border:1px solid red;
        flex:auto;
    }
    .footer{
        border:1px solid blue;
        flex:0 0 80px;
    }
</style>