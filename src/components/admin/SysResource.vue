<template>
    <div>
      <div class="table"> <!-- 页面表格begin -->
            <div class="crumbs"> <!-- 页面标题begin -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i> 资源管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> <!-- 页面标题end--> 
  <div class="container"><!-- 页面内容区begin -->
      <div class="custom-tree-container">  
            <div class="block">   
                <el-tree   :data="treeData" :props="defaultProps"   node-key="id"    :expand-on-click-node="false" >   
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
           </div><!-- 页面内容区end-->            
    </div><!-- 页面表格end -->


     <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">         
			<el-form :model="addForm" label-width="80px" :rules="formRules" ref="addForm">
				<el-form-item label="名称" prop="resoureName">
					<el-input v-model="addForm.resoureName" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="类型" prop="resoureType">				
                 <el-select v-model="addForm.resoureType" placeholder="请选择">
                  <el-option v-for="item in resoureTypeOptions"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
            </el-select>
				</el-form-item>		
           <el-form-item label="权限标识" prop="permission">
					<el-input v-model="addForm.permission" auto-complete="off" placeholder="路由path为'/index'则配index"></el-input>
				</el-form-item>
        <el-form-item label="URL地址" prop="resoureUrl">
					<el-input v-model="addForm.resoureUrl" auto-complete="off" placeholder='可为空'></el-input>
				</el-form-item>        
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible=false">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template> 
</template>

<script>
  export default {
    data() {
      return {
        treeData:[],
        addFormVisible:false,
        addLoading:false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        addForm:{},
        resoureTypeOptions:[{
          value: 'module',
          label: 'module'
        }, {
          value: 'url',
          label: 'url'
        }, {
          value: 'button',
          label: 'button'
        }],
         //输入框验证
         permission: "",
      //           resoureUrl: "" ,
      //           parentId:node.data.id  
      formRules: {
        resoureName: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
        resoureType: [
          { required: true, message: "请选择资源类型", trigger: "blur" }
        ], 
        parentId: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
      },        
    
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      getResult()
      {
            var _this = this;
            //this.listLoading = true;  
            
            let param = Object.assign({}, {});
            this.$ajax({
                method: "post",
                url: "/api/sysResource_api/getSysResourceList",
                data: param
            }).then(
                function(resultData) {

                _this.treeData = resultData.data.data;
                         
               
                },
                function(resultData) {
                // _this.tableData.message = "Local Reeuest Error!";
                //console.log(resultData);
                }
            ); 
      },
      //添加组织结构节点
    append(node,param) { 
      var _this = this;   
      if(param=='1')
      {
     //新增组织节点时获取当前节点的ID     
      //this.addForm.parentId=node.data.id;
       this.addForm.id='0';
      //显示添加组织结构界面
      this.addFormVisible = true;
      this.addForm={
                id:0,
                resoureName:"",
                resoureType: "",
                permission: "",
                resoureUrl: "" ,
                parentId:node.data.id    
        };
      }
       if(param=='2')
      {
        //根据id获取
        let param = new URLSearchParams();
             var id=node.data.id;
             param.append("ID",id);
            
            this.$ajax({
                method: "post",
                url: "/api/sysResource_api/querySysResourceByPrimaryKey",
                data: param
            }).then(
                function(resultData) {
//alert(resultData.data.message);
                _this.addForm = resultData.data.data;
                _this.listLoading = false;
                }
            );           
      //显示添加组织结构界面
       this.addFormVisible = true;
               
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
            url: "/api/sysResource_api/deleteResourceByID",
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
              url: "/api/sysResource_api/saveSysResource",
              data: param
            }).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              //this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              //重新获取新增后的组织机构数据
              this.getResult();
            });
          });
        }
      });
    }

    },
     mounted() {
    //获取列表
    this.getResult();
    
   
         }
  };
</script>
