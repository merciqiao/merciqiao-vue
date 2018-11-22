<template >
    <!-- 查询区----start -->
    <div class="container">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="动态下拉框">
                <el-select v-model="formInline.selected" placeholder="请选择">
                    <el-option
                        v-for="item in selectsData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 查询区----end -->
</template>
<style lang="scss">
// 设置输入框的宽度
.el-form-item__content {
  width: 220px;
}
</style>
<script>
export default {
  name: "searchinput",
  data() {
    return {
      formInline: {
        //表单对象
        user: "",
        region: "",
        selected:''
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      selectsData: [ //下拉框数据
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ]
      
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>