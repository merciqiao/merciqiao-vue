<template>
    <div class='contain'>
        <h2 class="title">哨口令</h2>
        <el-form class="outer" :model="mayiForm" :inline="true">
            <el-form-item class='text'>
                <el-input v-model="mayiForm.code" placeholder="口令复制到此"></el-input>

            </el-form-item>
            <el-form-item class='btn'>
                <el-button type="primary" @click="add">添加</el-button>
            </el-form-item>

        </el-form>
        <el-button style="width:100%;" type="warning" @click="fresh">刷新</el-button>
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column prop="city" label="城市" min-width="25">
            </el-table-column>
            <el-table-column prop="code" label="口令">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="28">
                <template slot-scope="scope">
                    <el-button size="mini" @click="copy(scope.$index, scope.row)">复制</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<style lang="scss">
.contain {
  margin: 3px;
}
.outer {
  display: flex;
  .el-form-item {
    margin-bottom: 0px;
  }
  .text {
    flex-grow: 1;
    .el-form-item__content {
      width: 100%;
    }
  }
  .btn {
    width: 60px;
  }
}
.title {
  display: block;
  text-align: center;
}
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      mayiForm: {
        //表单对象
        code: ""
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false //显示错误提示
      },
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          city: "广东",
          code: "#吱口令#添加好友w4BCE7421c"
        },
        {
          id: "2",
          date: "2016-05-04",
          city: "北京",
          code: "#吱口令#添加好友E7HtjS96cT"
        },
        {
          id: "3",
          date: "2016-05-01",
          city: "上海",
          code: "#吱口令#添加好友E7HtjS96cT"
        },
        {
          id: "4",
          date: "2016-05-03",
          city: "深圳",
          code: "#吱口令#添加好友E7HtjS96cT"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    add() {
      this.$message({
        type: "success",
        message: "功能开发中!"
      });
    },
    fresh() {
      this.$message({
        type: "success",
        message: "功能开发中!"
      });
    },
    copy(){
        this.$message({
        type: "success",
        message: "功能开发中!"
      });
    }
  }
};
</script>
