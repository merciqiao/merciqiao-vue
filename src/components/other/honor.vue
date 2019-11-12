<template>
  <div class="_honor">
    <!-- <img class="img" src="static/img/honor.jpg" alt=""> -->
    <div class="img"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
._honor {
  height: 100%;
  .img {
    height: 100%;
    background-image: url("/static/img/honor.jpg");
    background-clip: content-box;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>