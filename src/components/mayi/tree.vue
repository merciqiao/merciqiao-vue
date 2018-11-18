<template>
  <div class='contain'>
    <h2 class="title">哨口令</h2>
    <el-form class="outer" :model="mayiForm" :inline="true">
      <el-form-item class='text'>
        <el-input v-model="mayiForm.code" placeholder="口令粘贴到此"></el-input>

      </el-form-item>
      <el-form-item class='btn'>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>

    </el-form>
    <el-button style="width:100%;" type="warning" @click="fresh">刷新</el-button>
    <el-table :data="tableData" border style="width: 100%" v-loading="listLoading" :row-class-name="tableRowClassName">
      <el-table-column prop="city" label="城市" min-width="25">
      </el-table-column>
      <el-table-column prop="code" label="口令" >
        <template slot-scope="scope" >
         
             <span class='copytext' :id="'code_'+scope.$index">{{ scope.row.code }}</span>
            <span> {{ getCode(scope.row.code) }}</span> 
          
         
        </template>

      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="28">
        <template slot-scope="scope">
           <div v-show="enable(scope)">
            <el-button id='copy_btn' data-clipboard-action="copy" :data-clipboard-target="'#code_'+scope.$index" size="mini" @click="copy(scope.$index, scope.row)">复制</el-button>
          </div>
          <div style="text-align:center;" v-show="!enable(scope)">自己</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.copytext{
  display: block;
  font-size: 0;
  height: 0px;
  width: 0px;
}
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
  height: 40px;
}
.el-table .warning-row {
    background: #fafafa;
  }

  .el-table .success-row {
    background: #f0f9eb;
    
  }

</style>

<script>
import apis from '../../apis/apis';
export default {
  name: "login",
  data() {
    return {
      listLoading:false,
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
          code: "#吱口令#长按复制此条消息，打开支付宝即可添加我为好友FMSj7Z97hO",
          ip:''
        },
        {
          id: "2",
          date: "2016-05-04",
          city: "北京",
          code: "#吱口令#长按复制此条消息，打开支付宝即可添加我为好友DV4j8Y36Us",
          ip:''
        }
      ]
    };
  },
  mounted() {
    this.fresh();
    var loginLog = {
      ip: returnCitySN["cip"],
      city: returnCitySN["cname"] + '-蚂蚁种树'
    };

    apis.shiroApi.loginLog(loginLog);
    var clipboard = new Clipboard('#copy_btn');
    clipboard.on('success', e => {
      e.clearSelection();
      this.$message({
        type: "success",
        message: "复制成功!"
      });
    });

  },
  computed:{
    getCode(){
      var n=0;
      return function(code){
        var newCode=code.replace('长按','').replace('此条消息','').replace('即可','').replace('我为','');
        return newCode;
      }
    }
  },
  methods: {
    enable(scope){
      var show= scope.row.ip!=returnCitySN["cip"];
      return show;
    },

    add() {
      debugger;
      if (this.mayiForm.code == "") {
        this.$message({
          type: "success",
          message: "哨口令不能为空!"
        });
        return;
      }
      else {
        var tree = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"],
          code: this.mayiForm.code
        };
        apis.mayiApi.add(tree).then(data => {
          if (data && data.data) {
            var json = data.data;
            if (json.status == 'SUCCESS') {
                 this.$message({type: "success",message: "添加成功!"});
                 this.mayiForm.code="";
                 this.fresh();
            }
            else{
                this.$message({type: "error",message: "添加失败!"});
                this.fresh();
            }
          }

        }).catch(err => {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
          this.fresh();
        });
      }
      
    },
    fresh() {
      this.listLoading=true;
      var param={
        ip:returnCitySN["cip"],
        currentPage:0,
        pageSize:100
      }
      apis.mayiApi.getList(param)
      .then(data=>{
        this.listLoading=false;
         if (data && data.data) {
            var json = data.data;
            if (json.status == 'SUCCESS') {
                var list=json.data;
                this.tableData=list;
                this.$message({type: "success",message: "刷新成功!"});
            }
            else{
                this.$message({type: "error",message: "刷新失败请重试!"});
            }
          }
      })
      .catch(err=>{
        this.listLoading=false;
        this.$message({type: "error",message: "刷新失败请重试!"});
      });
      
    },
    copy(index,row) {
      var tree={
        ip:returnCitySN["cip"],
        addid:row.id
      };
      apis.mayiApi.copy(tree)
      .then(data=>{
         if (data && data.data) {
            var json = data.data;
            if (json.status == 'SUCCESS') {
                console.log('复制成功');
                this.fresh();
            }
            else{
                console.log('复制失败');
            }
          }
      })
      .catch(err=>{
         var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + '-蚂蚁种树复制异常'
          };

          apis.shiroApi.loginLog(loginLog);
      });
    },
     tableRowClassName({row, rowIndex}) {   
        if(row.ip==returnCitySN["cip"]){
          return 'success-row';
        }
        if(rowIndex%2==0){
         return 'warning-row';
       }
        return '';
      }

  }
};
</script>
