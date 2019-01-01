<template>
<div class="flexContainer">
    <header class="head">
        这是标题
    </header>
    <main class="main"> 
        这是内容区
    </main>
    <footer class="footer">
        这是页底
    </footer>
</div>
</template>
<style>
    .flexContainer{
        display:flex;
        flex-direction: column;
    }
    .head{
        border:1px solid green;
        height:100px;
    }
    .main{
        border:1px solid red;
    }
    .footer{
        border:1px solid blue;
    }
</style>