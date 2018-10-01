  <template> 
  <div class="table"> <!-- 页面表格begin -->
            <div class="crumbs"> <!-- 页面标题begin -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i>机构管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> <!-- 页面标题end--> 
            <div class="container"><!-- 页面内容区begin -->
        <div class="custom-tree-container">  
              <div class="block">   
                  <el-tree   :data="treeData" :props="defaultProps"   node-key="id" v-loading="listLoading"    :expand-on-click-node="false" >   
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                              <span>{{node.label}}                           
                            <i class="el-icon-plus" @click="() => append(node,'1')"></i>
                            <i class="el-icon-edit-outline" @click="() => append(node,'2')"></i>
                            <i class="el-icon-delete" @click="() => remove(node, data)"></i>
                            </span>   
                          </span>
                  </el-tree>             
              </div>
        </div>
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">         
        <el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
          <el-form-item label="机构名称" prop="orgName">
            <el-input v-model="addForm.orgName" auto-complete="off"></el-input>
          </el-form-item>
              <el-form-item label="组织类型" prop="orgType">				
                  <el-select v-model="addForm.orgType" placeholder="请选择">
                    <el-option v-for="item in orgTypeOptions"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
              </el-select>
          </el-form-item>		
                  <el-form-item label="是否有效" prop="validateState">				
                  <el-select v-model="addForm.validateState" placeholder="请选择">
                    <el-option v-for="item in validateStateOptions"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
              </el-select>
          </el-form-item>		
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
          <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">         
        <el-form :model="editForm" label-width="80px" :rules="formRules" ref="editForm">
          <el-form-item label="机构名称" prop="orgName">
            <el-input v-model="editForm.orgName" auto-complete="off"></el-input>
          </el-form-item>
              <el-form-item label="组织类型" prop="orgType">				
                  <el-select v-model="editForm.orgType" placeholder="请选择">
                    <el-option v-for="item in orgTypeOptions"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
              </el-select>
          </el-form-item>		
                  <el-form-item label="是否有效" prop="validateState">				
                  <el-select v-model="editForm.validateState" placeholder="请选择">
                    <el-option v-for="item in validateStateOptions"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
              </el-select>
          </el-form-item>		
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
       </div><!-- 页面内容区end-->            
    </div><!-- 页面表格end -->
   </template> 
  <script>
  let id = 1000;
  export default {
    name: 'OrganizationTree',
    data() {
      return {
        //组织结构数据
        treeData: [],
        //属性名称转换
        defaultProps: {
            children: 'children',
            label: 'name'
          }    
        ,
        //组织结构树Loading
        listLoading: false,
        //添加组织结构dialog显示状态
        addFormVisible: false,
        //添加按钮Loading加载
        addLoading: false,
        //组织类型下拉框
        orgTypeOptions: [{
            value: 'org',
            label: '组织'
          }, {
            value: 'dept',
            label: '部门'
          }, {
            value: 'store',
            label: '门店'
          }],
          //是否有效下拉框
        validateStateOptions: [{
            value: '0',
            label: '无效'
          }, {
            value: '1',
            label: '有效'
          }
      ],
        //输入框验证
        formRules: {
          orgName: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
          orgType: [
            { required: true, message: "请选择组织类型", trigger: "blur" }
          ],
          validateState: [
            { required: true, message: "请选择是否有效", trigger: "blur" }
          ]
        },
      //新增界面数据
        addForm: {
          id:"",
          orgName: "",
          orgType: "",
          validateState: "",
          parentId:""       
        },
        //编辑组织结构dialog显示状态
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //编辑界面数据
        editForm: {
          id:"",
          orgName: "",
          orgType: "",
          validateState: "",
          parentId:""       
        },
      };
    },
    methods: {
      //获取组织结构信息
      getResult: function() {
        var _this = this;
        this.listLoading = true;     
        let param = Object.assign({}, {});
        this.$ajax({
          method: "post",
          url: "/api/sysorg-api/querySysOrgList",
          data: param
        }).then(
          function(resultData) {
            _this.treeData = resultData.data.data;        
            _this.listLoading = false;
          },
          function(resultData) {
            _this.treeData.message = "Local Reeuest Error!";
          }
        );
      },
      //添加组织结构节点
      append(node,param) {
          //父节点id
        //console.log("父级节点ID："+node.data.parentId);
        //当前节点id
        //console.log("当前节点ID："+node.data.id);
          //当前节点orgType
        //console.log("orgType: "+node.data.orgType);
          //当前节点validateState
        //console.log("validateState: "+node.data.validateState);
        if(param=='1')
        {
      //新增组织节点时获取当前节点的ID     
        this.addForm.parentId=node.data.id;
        this.addForm.id='0';
        //显示添加组织结构界面
        this.addFormVisible = true;
        }
        if(param=='2')
        {
        //显示添加组织结构界面
        this.editFormVisible = true;
        //编辑信息展示
        this.editForm.id=node.data.id;
        this.editForm.orgName=node.data.name;
        this.editForm.orgType=node.data.orgType;
        this.editForm.validateState=node.data.validateState;
        this.editForm.parentId=node.data.parentId;          
        }

        },    
      //删除
      remove(node, data) {
          this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
          })
          .then(() => {
          let param = new URLSearchParams();
          param.append("orgid", node.data.id);
            this.$ajax({
              method: "post",
              url: "/api/sysorg-api/deleteSysOrg",
              data: param
            }).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              }); 
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);         
            
            });
          })
          .catch(() => {});
              
      },  
      //新增
      addSubmit: function() {      
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.addLoading = true;
              let param = Object.assign({}, this.addForm);              
              this.$ajax({
                method: "post",
                url: "/api/sysorg-api/addOrg",
                data: param
              }).then(res => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                //重新获取新增后的组织机构数据
                this.getResult();
              });
            });
          }
        });
      },
      //编辑
      editSubmit: function() {      
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              let param = Object.assign({}, this.editForm);              
              this.$ajax({
                method: "post",
                url: "/api/sysorg-api/addOrg",
                data: param
              }).then(res => {
                this.editLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                //重新获取新增后的组织机构数据
                this.getResult();
              });
            });
          }
        });
      }
    },
    mounted() {
      //获取组织结构信息
      this.getResult(); 
      
    }
  };
  </script>

  <style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

    .el-row {
      margin-bottom: 20px;
    
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

  </style>