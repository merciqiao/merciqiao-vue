<template >
    <div>
        横向表单:
        <!-- 查询区----start -->
        <!-- 查询区----start -->
        <div class="container form01">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="form1" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form1.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit1">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 查询区----end -->
        纵向单列表单(含验证):
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="文本框" prop="name">
                    <el-input v-model="form2.name" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="数字框" prop="amount">
                    <el-input type="number" min="0" v-model="form2.amount" placeholder="金额"></el-input>
                </el-form-item>
                <el-form-item label="下拉框" prop="region">
                    <el-select v-model="form2.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form2.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否" prop="delivery">
                    <el-switch v-model="form2.delivery"></el-switch>
                </el-form-item>

                <el-form-item label="多选按钮" prop="type">
                    <el-checkbox-group v-model="form2.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="单选按钮" prop="resource">
                    <el-radio-group v-model="form2.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="文本域" prop="desc">
                    <el-input type="textarea" v-model="form2.desc"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit2">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查询区----end -->
        纵向双列表单:
        <!-- 查询区----start -->
        <div class="container" style="width:660px;">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="form1" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form1.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="form1.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="" style="display:block;text-align: center;">
                    <el-button type="primary" @click="onSubmit3">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查询区----end -->
    </div>
</template>
<style lang="scss">
// 设置输入框的宽度

.form01 {
  .el-form-item__content {
    width: 220px;
    .el-select {
      width: 220px;
    }
  }
}
.form02 {
  .el-form-item__content {
    width: 430px;
    .el-select {
      width: 430px;
    }
  }
}
.form03 {
  .el-form-item__content {
    width: 220px;
    .el-select {
      width: 220px;
    }
  }
}
.el-checkbox-group .el-checkbox {
  margin-left: 0;
  padding-right: 30px;
}
</style>
<script>
export default {
  name: "searchinput",
  data() {
    return {
      form1: {
        //表单对象
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form2: {
        //表单对象
        name: "",
        amount: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit1() {
      this.$message({
        type: "success",
        message: "表单提交成功"
      });
    },
    //表单2提交
    onSubmit2() {
      this.$refs["form02"].validate(valid => {
        if (valid) {
          this.$alert("表单验证通过，提交成功", "标题名称", {
            confirmButtonText: "确定",
            callback: action => {
              //   this.$message({
              //     type: "info",
              //     message: `action: ${action}`
              //   });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit3() {
      this.$message({
        type: "success",
        message: "表单提交成功"
      });
    }
  }
};
</script>