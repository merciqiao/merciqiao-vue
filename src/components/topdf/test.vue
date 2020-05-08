<template>
  <div class="_test">
    <div class="outer">
      <div class="red firstrow">
        <div class="blue left">左边</div>
        <div class="blue right">
          <div class="green">右上</div>
          <div class="green bottom">
              <div class="left red">右下左</div>
              <div class="right red">右下右</div>
          </div>
        </div>
      </div>
      <div class="red">第二行</div>
      <div class="red third">
        <div class="item green">一</div>
        <div class="item green">二</div>
        <div class="item green">三</div>
        <div class="item green">四</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
._test {
  .red {
    border: 1px solid red;
  }
  .blue {
    border: 1px solid blue;
  }
  .green{
      border:1px solid green;
  }
  .outer {
    display: flex;
    flex-flow: column nowrap;
    .firstrow {
      display: flex;
      flex-flow: row nowrap;
      .left {
        flex: 1 1 auto;
      }
      .right {
        flex: 2 1 auto;
        .bottom{
            display: flex;
            flex-flow: row nowrap;
            .left{
                flex:1;
            }
            .right{
                flex:1;
            }
        }
      }
    }
    .third{
        display: flex;
        flex-flow: row nowrap;
        .item{
            flex:1;
        }
    }
  }
}
</style>