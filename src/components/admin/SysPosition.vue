  <template>  
  <section> 
    <div class="table"> <!-- 页面表格begin -->
          <div class="crumbs"> <!-- 页面标题begin -->
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-tickets"></i> 岗位管理</el-breadcrumb-item>
              </el-breadcrumb>
          </div> <!-- 页面标题end--> 
          <div class="container"><!-- 页面内容区begin -->
             <div class="handle-box"> <!-- 搜索区begin -->
              <!--工具条-->
              <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                  <el-form :inline="true" :model="filters">                  
                      <el-form-item>
                        岗位名称: <el-input v-model="filters.positionName"  placeholder="岗位名称"  size="mini" style="width:200px; heght:30px;"></el-input>
                      </el-form-item>  
                      <el-form-item>
                        岗位编码：<el-input v-model="filters.positionCode"   placeholder="岗位编码"  size="mini" style="width:200px; heght:30px;"></el-input>
                      </el-form-item>                                        
                      <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getResult(1)" size="mini">搜索</el-button>
                      </el-form-item>
                  </el-form>
              </el-col>
            </div> <!-- 搜索区end -->          
            <!--新增按钮-->
              <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDeleteList" size="mini" round>删除</el-button>
        <template>
            <!--表格数据及操作-->
            <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
                <!--勾选框-->
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!--索引-->
                <el-table-column type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="positionName" label="岗位名称">
                  <template slot-scope="scope">
                  <el-button @click="handleSelect(scope.$index,scope.row)" type="text" size="small">{{scope.row.positionName}}</el-button>      
                  </template>
                </el-table-column>
                <el-table-column prop="positionCode" label="岗位编码" >
                </el-table-column>  
                <el-table-column prop="orderBy" label="排序" >
                </el-table-column>
                  <el-table-column prop="" label="操作" width="150">
                  <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>	                          
                    </template>
                </el-table-column>     
            </el-table>
         </template>
          <br>
          <br>
          <!-- 分页 -->
          <el-pagination @current-change="getResult"  :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count" >
          </el-pagination>
          </div><!-- 页面内容区end-->            
        </div><!-- 页面表格end -->
          <!--新增界面-->
                <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">         
                  <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                    <el-form-item label="岗位名称" prop="positionName">
                      <el-input v-model="addForm.positionName" auto-complete="off"></el-input>
                    </el-form-item>           
                  <el-form-item label="岗位编码" prop="positionCode">
                      <el-input v-model="addForm.positionCode" auto-complete="off"></el-input>
                    </el-form-item>
                      <el-form-item label="排序" prop="orderBy">
                      <el-input v-model="addForm.orderBy" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
                  </div>
                </el-dialog>
                <!--编辑界面-->
                <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">         
                  <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="岗位名称" prop="positionName">
                      <el-input v-model="editForm.positionName" auto-complete="off"></el-input>
                    </el-form-item>           
                  <el-form-item label="岗位编码" prop="positionCode">
                      <el-input v-model="editForm.positionCode" auto-complete="off"></el-input>
                    </el-form-item>
                      <el-form-item label="排序" prop="orderBy">
                      <el-input v-model="editForm.orderBy" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
                  </div>
                </el-dialog>
                <!-- 查看详细 -->
                <el-dialog title="编辑" :visible.sync="infoFormVisible" :close-on-click-modal="false">         
                  <el-form :model="infoForm" label-width="80px"  ref="infoForm">
                    <el-form-item label="岗位名称" prop="positionName">
                      <el-input v-model="infoForm.positionName" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>           
                  <el-form-item label="岗位编码" prop="positionCode">
                      <el-input v-model="infoForm.positionCode" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                      <el-form-item label="排序" prop="orderBy">
                      <el-input v-model="infoForm.orderBy" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
                  <el-form :model="infoForm" label-width="80px"  ref="infoForm">
                    <el-form-item label="岗位名称" prop="positionName">
                      <el-input v-model="infoForm.positionName" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>           
                  <el-form-item label="岗位编码" prop="positionCode">
                      <el-input v-model="infoForm.positionCode" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                      <el-form-item label="排序" prop="orderBy">
                      <el-input v-model="infoForm.orderBy" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="infoFormVisible = false">取消</el-button>               
                  </div>
                </el-dialog>  
        </section> 
  </template>
  <script>
  import ToolBar from '../Common/Toolbar/index'
  import DashBoard from '../Common/Dashboard/index'
  export default {
    components: {
      DashBoard,
      ToolBar
    },
    data() {
      return {
        //搜索区域参数
        filters: {
          positionName: "",
          positionCode: ""
        },
        //table返回的数据
        tableData: [],
        //列表Loading加载
        listLoading: false,
        //批量选中data
        selectList: [],
        //分页
        count: 0,
        currentPage: 1,
        pageSize: 10,
        //新增界面是否显示
        addFormVisible: false,
        //添加按钮Loading加载
        addLoading: false,
        //输入框验证
        addFormRules: {
          positionName: [
            { required: true, message: "请输入岗位名称", trigger: "blur" }
          ],
          positionCode: [
            { required: true, message: "请输入岗位编码", trigger: "blur" }
          ],
          orderBy: [{ required: true, message: "请输入排序", trigger: "blur" }]
        },
        //新增界面数据
        addForm: {
          positionName: "",
          positionCode: "",
          orderBy: ""
        },
        //编辑界面是否显示
        editFormVisible: false,
        //编辑按钮Loading加载
        editLoading: false,
        //输入框验证
        editFormRules: {
          positionName: [
            { required: true, message: "请输入岗位名称", trigger: "blur" }
          ],
          positionCode: [
            { required: true, message: "请输入岗位编码", trigger: "blur" }
          ],
          orderBy: [{ required: true, message: "请输入排序", trigger: "blur" }]
        },
        //编辑界面数据
        editForm: {
          id: "",
          positionName: "",
          positionCode: "",
          orderBy: ""
        },
        //详细界面是否显示
        infoFormVisible: false,
        //详细界面数据
        infoForm: {
          positionName: "",
          positionCode: "",
          orderBy: ""
        }
      };
    },
    methods: {
      getResult: function(val) {
        var _this = this;
        this.listLoading = true;
        let param = Object.assign(
          {},
          {
            currentPage: val,
            pageSize: 10,
            positionName: this.filters.positionName,
            positionCode: this.filters.positionCode
          }
        );
        this.$ajax({
          method: "post",
          url: "/api/api/sysPosition/Web/getSysPositionList",
          data: param
        }).then(function(resultData) {
          _this.tableData = resultData.data.data;
          _this.count = resultData.data.count;
          _this.listLoading = false;
        });
      },
      //显示新增界面
      handleAdd: function() {
        this.addFormVisible = true;
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
                url: "/api/api/sysPosition/Web/create/v1",
                data: param
              }).then(res => {
                this.addLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getResult(1);
              });
            });
          }
        });
      },   
      //显示编辑界面
      handleEdit: function(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },    
      //编辑
        editSubmit: function() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              let param = Object.assign({}, this.editForm);
              console.log(param);
              this.$ajax({
                method: "post",
                url: "/api/api/sysPosition/Web/update/v1",
                data: param
              }).then(res => {
                this.editLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getResult(1);
              });
            });
          }
        });
      },
      //查看详细信息
      handleSelect: function(index, row) {
        this.infoFormVisible = true;
        this.infoForm = Object.assign({}, row);

      },
      //批量选中
      selectChange: function(val) {
        this.selectList = val;
      }, //批量删除
      handleDeleteList: function() {
        const length = this.selectList.length;
        let id = "";
        for (let i = 0; i < length; i++) {
          id += this.selectList[i].id + ",";
        }
        //去掉结尾,
        id = id.substring(0, id.length - 1);
        this.$confirm("确认删除该记录吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.listLoading = true;
            let param = new URLSearchParams();
            param.append("ids", id);
            console.log("ids:" + param);
            this.$ajax({
              method: "post",
              url: "/api/api/sysPosition/deleteSysPositionById",
              data: param
            }).then(res => {
              this.listLoading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.selectList = [];
              this.getResult(1);
            });
          })
          .catch(() => {});
      },
      //table序号
      indexMethod(index) {
        return index + 1;
      }
    },
    mounted() {
      //初始加载
      this.getResult(1);
    }
  };
  </script>