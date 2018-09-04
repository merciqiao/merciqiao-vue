        <template> 
         <div >  
                 <div class="table"> <!-- 页面表格begin -->
          <div class="crumbs"> <!-- 页面标题begin -->
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-tickets"></i> 角色权限管理</el-breadcrumb-item>
              </el-breadcrumb>
          </div> <!-- 页面标题end--> 
          <div class="container"><!-- 页面内容区begin -->
             <div class="handle-box"> <!-- 搜索区begin -->
              
                    角色编码： <el-input v-model="s_rolecode"  placeholder="角色编码" style="width:200px; heght:30px;" size="mini"></el-input>
                
                    映射角色编码：  <el-input v-model="s_maprolecode"   placeholder="映射角色编码" style="width:200px; heght:30px;" size="mini"></el-input>
                            
                        <el-button type="success" icon="el-icon-search" @click="getResult(1)" size="mini">搜索</el-button>
                        <br>
                        <br>
             </div> <!-- 搜索区end -->   
                    <!--新增按钮-->
            
                    <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="handledelete" size="mini" round>删除</el-button>
            
                <!--表格数据及操作-->
                <el-table :data="tableData" class="mgt20" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark" @selection-change="selectChange">
                    <!--勾选框-->
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!--索引-->
                    <el-table-column type="index" :index="indexMethod">
                    </el-table-column>
                    <el-table-column prop="roleCode" label="角色" width="180" sortable>
                    </el-table-column>
                    <el-table-column prop="mappingRoleCode" label="映射角色" width="180">
                    </el-table-column>           
                    <el-table-column prop="id" label="id" >
                    </el-table-column>          
                
                </el-table>
                <br>
                <br>
                <!--分页条total, sizes, prev, pager, next, jumper-->                
                <el-pagination    @current-change="getResult"  :current-page="currentPage"    :page-size="pageSize" layout="total, prev, pager, next"  :total="count" >
                </el-pagination>
                  </div><!-- 页面内容区end-->            
                </div><!-- 页面表格end -->
                <!--新增界面-->
                <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false"  >
                    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="角色" prop="roleName">
                        <el-select v-model="addForm.roleCode" placeholder="请选择">
                        <el-option
                            v-for="item in rolelist"
                            :key="item.roleCode"
                            :label="item.roleName"
                            :value="item.roleCode">
                        </el-option>
                        </el-select>                                
                     </el-form-item>                    
                     <el-form-item label="映射角色" prop="roleCode">
                                <el-select v-model="addForm.mappingRoleCode" multiple placeholder="请选择">
                            <el-option
                            v-for="item in rolelist"
                            :key="item.roleCode"
                            :label="item.roleName"
                            :value="item.roleCode">
                            </el-option>
                        </el-select>
                    </el-form-item>			
                   </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
                    </div>
                </el-dialog>
       </div>     
                
 </template>
<script>
export default {
  data() {
    return {
      s_rolecode: "",
      s_maprolecode: "",
      addFormVisible: false,
      tableData: [],
      rolelist: [],
      addForm: [],
      selectList: [],
      addLoading: false,
      //分页
      count: 0,
      currentPage: 1,
      pageSize: 10,
      //输入框验证
      addFormRules: {
        // rolecode: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      //新增界面数据
      addForm: [],
      rolelist: []
    };
  },
  methods: {
    getResult: function(val) {
      var _this = this;
      let param = Object.assign(
        {},
        {
          currentPage: val,
          pageSize: 10,
          roleCode: this.s_rolecode,
          mappingRoleCode: this.s_maprolecode
        }
      );
      this.$ajax({
        method: "post",
        url: "/api/sysRoleMapping-api/querySysRoleMappingList",
        data: param
      }).then(
        function(resultData) {
          _this.tableData = resultData.data.data;
          _this.count = resultData.data.count;
        },
        function(resultData) {}
      );
    },
    getrolelist() {
      var _this = this;
      let param = Object.assign({}, {});
      this.$ajax({
        method: "post",
        url: "/api/sysrole-api/querySysRoleList",
        data: param
      }).then(
        function(resultData) {
          _this.rolelist = resultData.data.data;
        },
        function(resultData) {}
      );
    },
    selectChange: function(val) {
      this.selectList = val;
    },
    indexMethod(index) {
      return index;
    },
    handleAdd: function() {
      var _this = this;
      _this.addFormVisible = true;
      _this.addForm = {
        id: 0,
        roleCode: "",
        mappingRoleCode: []
      };
    },
    handledelete: function() {
      var rows = this.selectList; //alert(rows);
      if (rows) {
        rows.forEach(row => {
          var _this = this;
          this.listLoading = true;
          let param = new URLSearchParams();
          param.append("ids", row.id);
          this.$ajax({
            method: "post",
            url: "/api/sysRoleMapping-api/deleteSysRoleMapping",
            data: param
          }).then(function(resultData) {});
        });
        this.getResult(1);
      }
    },
    addSubmit: function() {
      var _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            //let param = Object.assign({}, this.addForm);
            //alert(param);
            this.addForm.mappingRoleCode.forEach(mappingRole => {
              let param = Object.assign(
                {},
                {
                  roleCode: this.addForm.roleCode,
                  mappingRoleCode: mappingRole
                }
              );
              //alert(param);
              this.$ajax({
                method: "post",
                url: "/api/sysRoleMapping-api/add",
                data: param
              }).then(res => {});
            });

            this.$message({
              message: "提交成功",
              type: "success"
            });
            _this.addFormVisible = false;
            //this.$refs["addForm"].resetFields();
            this.getResult(1);
          });
        }
      });
    }
  },
  mounted() {
    this.getResult(1);
    this.getrolelist();
  }
};
</script>
                
                