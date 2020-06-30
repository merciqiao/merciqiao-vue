<template>
<el-scrollbar style="height:100%">
  <div class="_bangka">
    <div class="inner">
      <div class="title"><h2>根据手机号查询绑卡信息</h2></div>
      <div>
        <el-form :inline="false">
          <el-form-item>
            <el-input v-model.trim="bangkaForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div v-for="(item, index) in bangkaData" :key="index">
          <div style="border:1px solid green;">
            <div>姓名:{{item.name}}</div>
            <div>类型:<span :style="getBtnType(item.type)" plain>{{item.type}}</span></div>
            <div>时间:{{item.time}}</div>
            <div>绑卡类型:{{item.isDefault}}</div>
            <div :id="'bangka_'+index">绑卡信息:{{item.bangkaInfo}}</div>
            <el-button
              id="copy_btn"
              data-clipboard-action="copy"
              :data-clipboard-target="'#bangka_'+index"
              size="mini"
              type="warning"
            >复制</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </el-scrollbar>
</template>
<style lang="scss">
._bangka {
  overflow-y: auto;;
  width: 100%;
  display: flex;
  //   align-items: center;
  justify-content: center;
  .inner {
    .title {
      text-align: center;
      margin:20px auto;
      
    }
  }
}
</style>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      bangkaForm: {
        mobile: ""
      },
      bangkaData: [
        {
          name: "姓名为空",
          type: "类型为空",
          bangkaInfo: "绑卡信息为空",
          time: "时间为空",
          isDefault: ""
        }
      ],
      bangkaDataInit: [
        {
          name: "姓名为空",
          type: "类型为空",
          bangkaInfo: "绑卡信息为空",
          time: "时间为空",
          isDefault: ""
        }
      ]
    };
  },
  mounted() {
    var clipboard = new Clipboard("#copy_btn");
    clipboard.on("success", e => {
      e.clearSelection();
      this.$message({
        type: "success",
        message: "复制成功!",
        duration:800
      });
    });
  },
  methods: {
    search() {
      this.bangkaData = Object.assign([],this.bangkaDataInit);
      if (!this.bangkaForm.mobile) {
        this.$message({
          type: "success",
          message: "手机号不能为空",
          duration:800
        });
        return;
      }
      let formData = new FormData();
      formData.append("mobile", this.bangkaForm.mobile);
      Axios.post(
        "https://gateway.chengfengkuaiyun.com/pay-center-server/onlinesupport/getUserInfoByMobile",
        formData
      )
        .then(res => {
          var list = res.data.data;
          if (list && list.length > 0) {
            var userSnList = [];
            for (var i = 0; i < list.length; i++) {
              userSnList.push(list[i].user_sn);
            }
            for (var j = 0; j < userSnList.length; j++) {
              var userSn = userSnList[j];
              this.serchBangKa(j, userSn, list);
            }
          }
          console.log(res);
        })
        .catch(err => {
          this.$message({
            type: "success",
            message: "接口异常",
            duration:800
          });
          console.log(err);
        });
    },
    serchBangKa(j, userSn, list) {
      let formData = new FormData();
      formData.append("usersn", userSn);
      Axios.post(
        "https://gateway.chengfengkuaiyun.com/pay-center-server/onlinesupport/selectBindCardList",
        formData
      )
        .then(res => {
          var listBangKa = res.data.data;
          if (listBangKa && listBangKa.length > 0) {
            for (var k = 0; k < listBangKa.length; k++) {
              var bangkaInfo = {
                姓名: listBangKa[k].姓名,
                身份证号: listBangKa[k].身份证号,
                卡号: listBangKa[k].卡号,
                开户行: listBangKa[k].开户行,
                手机号: listBangKa[k].手机号
              };
              var bangkaItem = {
                name: list[j].name,
                type: this.typeToText(list[j].d_type),
                bangkaInfo: bangkaInfo,
                time: listBangKa[k].optionTime,
                isDefault: this.defaultToText(listBangKa[k].isDefault)
              };
              this.bangkaData.push(bangkaItem);
            }
          }
        })
        .catch(err => {});
    },
    typeToText(type) {
      if (type == 1) {
        return "货主";
      } else if (type == 2) {
        return "经纪人";
      } else if (type == 3) {
        return "司机";
      } else {
        return type;
      }
    },
    defaultToText(type) {
      if (type == 1) {
        return "当前绑卡";
      } else if (type == 0) {
        return "历史绑卡";
      } else if (type == 2) {
        return "历史提现记录";
      } else {
        return type;
      }
    },
    reset() {
      this.bangkaForm.mobile = "";
      this.bangkaData =Object.assign([],this.bangkaDataInit);
    },
    getBtnType(type) {
      if (type == "货主") {
        return "color:#67C23A";
      } else if (type == "经纪人") {
        return "color:#E6A23C";
      } else if (type == "司机") {
        return "color:#F56C6C";
      } else {
        return "color:#909399";
      }
    }
  }
};
</script>