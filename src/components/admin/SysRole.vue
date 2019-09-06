<template>
    <div class="table">
        <!-- 页面表格begin -->
        <div class="crumbs">
            <!-- 页面标题begin -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 页面标题end-->
        <div class="container">
            <!-- 页面内容区begin -->
            <div id="app">
                <div style=" width:50%;float:left;">

                    角色名称：
                    <el-input v-model="s_rolename" label="角色编码" placeholder="角色编码" style="width:200px; heght:30px;" size="mini"></el-input>

                    角色编码：
                    <el-input v-model="s_rolecode" label="角色编码" placeholder="角色编码" style="width:200px; heght:30px;" size="mini"></el-input>

                    <el-button type="success" icon="el-icon-search" @click="getResult(1)" size="mini">搜索</el-button>
                    <br>
                    <br>

                    <!--新增按钮-->
                    <div class="clearfix">
                        <el-col :span="1" class="grid">
                            <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
                        </el-col>
                    </div>

                    <!--表格数据及操作-->
                    <el-table :data="tableData" class="mgt20" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark" @row-click="clickRow">
                        <!--勾选框-->
                        <el-table-column type="radio" width="50">
                              <template slot-scope="scope">
                                <el-radio v-model="curentroleid" :label="scope.row.id">{{null}}</el-radio>
                            </template>
                        </el-table-column>
                        <!--索引-->
                        <el-table-column type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色名称" width="150" sortable>
                        </el-table-column>
                        <el-table-column prop="roleCode" label="角色编码" width="150">
                        </el-table-column>
                        <el-table-column prop="roleType" label="角色类型">
                        </el-table-column>

                        <el-table-column label="编辑" width="100">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="enditRole(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="删除" width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" @click="delRole(scope.row)" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <br>
                    <!--分页条total, sizes, prev, pager, next, jumper-->

                    <el-pagination @size-change="handleSizeChange" @current-change="getResult" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="roletotal">
                    </el-pagination>
                    <!--新增界面-->
                    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
                        <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="166px">
                            <el-form-item label="角色名称" prop="roleName">
                                <el-input v-model="addForm.roleName" auto-complete="off" style="width:400px;"></el-input>
                            </el-form-item>
                            <el-form-item label="角色编码" prop="roleCode">
                                <el-input v-model="addForm.roleCode" auto-complete="off" style="width:400px;"></el-input>
                            </el-form-item>
                            <el-form-item label="角色类型" prop="roleType">
                                <!-- <select v-model="addForm.roleType"  style="width:200px;" >
                         <option v-for="(item,index) in roleTypeData":value="item.dictDetailValue">{{ item.dictDetailName }}</option>
                     </select>					 -->
                                <el-select v-model="addForm.roleType" placeholder="请选择" clearable>
                                    <el-option v-for="item in roleTypeData" :key="item.value" :label="item.dictDetailName" :value="item.dictDetailValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div style=" width:45%;float:right;">
                    <div class="clearfix">
                        <el-col :span="3" class="grid">
                            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addRoleUser(1)" size="mini" round>新增</el-button>
                        </el-col>
                        <el-col :span="1" class="grid">
                            <el-button type="danger" icon="el-icon-delete" @click="deleteUserRole" size="mini" round>删除</el-button>
                        </el-col>
                    </div>
                    
                    <el-table :data="roleUserList" class="mgt20" @selection-change="roleuserSelectChange" border style="width: 100%" stripe ref="roleUserList" tooltip-effect="dark">
                        <!--勾选框-->
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <!--索引-->
                        <el-table-column type="index" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="userName" label="用户名称" width="180" sortable>
                        </el-table-column>
                        <el-table-column prop="targetId" label="用户编号" width="180">
                        </el-table-column>
                        <el-table-column prop="id" label="id" width="180">
                        </el-table-column>
                    </el-table>
                    <el-pagination @current-change="getRoleUserList" :current-page="roleusercurrentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="roleusercount">
                    </el-pagination>
                    <br>
                    <!--新增界面-->
                    <el-dialog title="新增用户" :visible.sync="addRoleUserVisible" :close-on-click-modal="false">
                        <el-row>
                            <el-col :span="200" class="grid">
                                <el-input v-model="s_username" label="用户名称" placeholder="请输入内容" style="width:200px; heght:30px;" size="mini"></el-input>
                            </el-col>
                            <el-col :span="1" class="grid">
                                <el-button type="success" @click="addRoleUser(1)" icon="el-icon-search" size="mini">搜索</el-button>
                            </el-col>
                        </el-row>
                        <br>
                        <el-table :data="userData" @selection-change="userSelectionChange" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
                            <!--勾选框-->
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <!--索引-->
                            <el-table-column type="index" :index="indexMethod">
                            </el-table-column>
                            <el-table-column prop="userName" label="用户名称" width="180">
                            </el-table-column>
                            <el-table-column prop="id" label="用户编号">
                            </el-table-column>

                        </el-table>
                        <el-pagination @current-change="addRoleUser" :current-page="usercurrentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="usercount">
                        </el-pagination>
                        <br>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="saveUserRole" :loading="addLoading">保存</el-button>
                            <el-button @click="addRoleUserVisible= false">关闭</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!-- 页面内容区end-->
    </div>
    <!-- 页面表格end -->
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            roleTypeData: [],
            roleUserList: [],
            userData: [],
            roleuserSelect: [],
            input: "",
            curentroleid: "",
            curentrow: null,
            //列表Loading加载   
            listLoading: false,
            //新增界面是否显示
            addFormVisible: false,
            //添加按钮Loading加载
            addLoading: false,
            //新增角色用户
            addRoleUserVisible: false,
            roletotal: 0,
            usercount: 0,
            roleusercount: 0,
            currentPage: 1,
            usercurrentPage: 1,
            roleusercurrentPage: 1,
            pageSize: 10,
            //检索字段
            s_rolename: "",
            s_rolecode: "",
            s_username: "",
            //     s_roleType:"",
            //输入框验证
            addFormRules: {
                roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
                roleCode: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
                roleType: [{ required: true, message: "请输入角色类型", trigger: "blur" }]
            },
            //新增界面数据
            addForm: [],
            UserSelection: []
        }
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        indexMethod(index) {
            return index;
        },
        //获取角色列表
        getResult: function(val) {

            var _this = this;
            this.listLoading = true;
            let param = Object.assign({}, { currentPage: val, pageSize: 10, roleName: this.s_rolename, roleCode: this.s_rolecode });
            this.$ajax({
                method: "post",
                url: "/api/sysrole-api/querySysRoleList",
                data: param
            }).then(
                function(resultData) {

                    _this.tableData = resultData.data.data;
                    _this.roletotal = resultData.data.count;
                    _this.listLoading = false;
                },
                function(resultData) {
                    // _this.tableData.message = "Local Reeuest Error!";
                    //console.log(resultData);
                }
                );

        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getResult(1);

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
                            url: "/api/sysrole-api/addRole",
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
        getRoleType: function() {

            var _this = this;
            this.listLoading = true;
            let param = new URLSearchParams();
            param.append("code", "PT_ROLETYPE");
            this.$ajax({
                method: "post",
                url: "/api/execute/api/sysDict/Web/searchCodeSysDictDetail",
                data: param
            }).then(
                function(resultData) {
                    _this.roleTypeData = resultData.data.data;
                    //alert(_this.roleTypeData)

                },
                function(resultData) {
                    // _this.tableData.message = "Local Reeuest Error!";
                    //console.log(resultData);
                }
                );
        },
        //显示新增界面
        handleAdd: function() {
            this.addFormVisible = true;
            this.addForm = {
                id: 0,
                roleName: "",
                roleCode: "",
                roleType: ""
            };
        },
        //显示编辑角色界面
        enditRole: function(row) {
            var _this = this;
            this.listLoading = true;
            this.addFormVisible = true;
            let param = new URLSearchParams();
            param.append("id", row.id);

            this.$ajax({
                method: "post",
                url: "/api/sysrole-api/getSysRoleByid",
                data: param
            }).then(
                function(resultData) {

                    _this.addForm = resultData.data.data;
                    _this.listLoading = false;
                }
                );
        },
        delRole: function(row) {
            let param = new URLSearchParams();
            param.append("id", row.id);

            this.$ajax({
                method: "post",
                url: "/api/sysrole-api/deleteSysRoleByid",
                data: param
            })
            .then(()=>{
                  this.$message({
                        message: "删除成功",
                        type: "success"
                    });   
            })
            .catch(()=>{
                this.$message({
                        message: "删除失败",
                        type: "success"
                    });
            })
            ;

        },
        getRoleUserList: function(val) {
            var _this = this;
            this.listLoading = true;
            let param = Object.assign({}, { currentPage: val, pageSize: 10, roleId: this.curentroleid });
            this.$ajax({
                method: "post",
                url: "/api/sysrole-api/queryRoleUserList",
                data: param
            }).then(
                function(resultData) {

                    _this.roleUserList = resultData.data.data;
                    _this.roleusercount = resultData.data.count;
                    //alert(_this.tableData);
                    //_this.listLoading = false;
                }
                );
        },
        clickRow: function(row) {
            this.roleuserSelect = [];
            // var roleid=row.id;
            var _this = this;
            this.curentroleid = row.id;
            this.curentrow = row;
            _this.getRoleUserList(1)

        },
        addRoleUser: function(val) {
            this.addRoleUserVisible = true;
            var _this = this;
            this.listLoading = true;
            let param = Object.assign({}, { currentPage: val, pageSize: 10, userName: this.s_username });
            this.$ajax({
                method: "post",
                url: "/api/sysuser-api/querySysUserList",
                data: param
            }).then(
                function(resultData) {

                    _this.userData = resultData.data.data;
                    _this.usercount = resultData.data.count;
                    //alert(_this.tableData);
                    //_this.listLoading = false;
                }
                );

        },
        deleteRoleUser: function() {
            let param = new URLSearchParams();
            param.append("id", row.id);

            this.$ajax({
                method: "post",
                url: "/api/sysrole-api/deleteSysRoleUserByid",
                data: param
            }).then(()=>{
                 this.$message({
                        message: "删除成功",
                        type: "success"
                    });
            });

        },
        userSelectionChange: function(val) {
            //alert(val);
            this.UserSelection = val;
        },
        roleuserSelectChange: function(val) {
            this.roleuserSelect = val;
        },
        saveUserRole: function() {
            if (this.curentroleid == "") {
                alert("请选择要添加的角色，单击选择行。");
            }
            var rows = this.UserSelection;
            if (rows) {
                rows.forEach(row => {
                    var _this = this;
                    this.listLoading = true;
                    let param = Object.assign({}, { id: 0, roleId: this.curentroleid, targetId: row.id });
                    this.$ajax({
                        method: "post",
                        url: "/api/sysrole-api/saveRoleUser",
                        data: param
                    }).then(
                        function(resultData) {

                        }
                        );
                    // alert(row.id)
                });
            }
            // this.$refs["addRoleUser"].resetFields();
            this.addRoleUserVisible = false;
            this.clickRow(this.curentrow);
            //alert(this.UserSelection);
        },
        deleteUserRole: function() {
            var rows = this.roleuserSelect;
            if (rows) {
                rows.forEach(row => {
                    var _this = this;
                    this.listLoading = true;
                    let param = new URLSearchParams();
                    param.append("id", row.id);
                    this.$ajax({
                        method: "post",
                        url: "/api/sysrole-api/deleteSysRoleUserByid",
                        data: param
                    }).then(
                        function(resultData) {

                        }
                        );
                });
            }
            this.addRoleUserVisible = false;
            this.clickRow(this.curentrow);
        }
    },
    mounted() {
        //获取列表
        this.getResult();
        // this.getRoleType();

    }
};
</script>
<style>
/* #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    } */


/* #roleuser {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }    
    el-input{width:200px;height: 50px;} */
</style>