<template>
    <div class="container">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
            <el-form-item label="昵称">
                <el-input v-model="formSearch.user" placeholder="模糊匹配"></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input v-model="formSearch.user" placeholder="城市"></el-input>
            </el-form-item>
            <el-form-item label="类别">
                <el-select v-model="formSearch.region" placeholder="活动区域">
                    <el-option label="留言" value="1"></el-option>
                    <el-option label="建议" value="2"></el-option>
                    <el-option label="BUG" value="3"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="年龄">
                <el-input type="number" v-model="formSearch.user" placeholder="年龄"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formSearch.region" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="qq号">
                <el-input v-model="formSearch.user" placeholder="qq号"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="formSearch.user" placeholder="创建时间"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row class="mgb15">
            <el-button size="small" round type="primary" @click="dialogAddVisible = true">新增</el-button>
            <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="name" label="昵称" width="200" align="center" sortable>
            </el-table-column>
            <el-table-column prop="city" label="城市" align="center" width="200">
            </el-table-column>
            <el-table-column prop="type" label="类别" align="center" width="200">
                 <template slot-scope="scope" align="center" width="200">
                    <span>{{ scope.row.type |convertType}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="age" label="年龄" align="center" width="200">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="200">
                 <template slot-scope="scope">
                    <span>{{ scope.row.gender==0?'男':'女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createtime" label="创建日期" :formatter="this.$common.timestampToTime" width="200" sortable>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog :title="formEditTitle" :visible.sync="dialogEidtVisible" width="700px">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :disabled="formEditDisabled" :inline="true" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="姓名" prop="name">
                    <el-input v-model="formEdit.name" placeholder="姓名" ></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="formEdit.city" placeholder="地址"></el-input>
                </el-form-item>
                 <el-form-item label="类别" prop="type">
                    <el-select v-model="formEdit.type" placeholder="类别">
                        <el-option label="留言" value=1></el-option>
                        <el-option label="建议" value=2></el-option>
                        <el-option label="BUG" value=3></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄" prop="age">
                    <el-input  v-model="formEdit.age" placeholder="年龄"></el-input>
                </el-form-item>
                 <el-form-item label="性别" prop="gender">
                    <el-select v-model="formEdit.gender" placeholder="性别">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="qq" prop="qq">
                    <el-input v-model="formEdit.qq" placeholder="qq"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEidtVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" type="primary" @click="dialogEidtVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->

        <!-- 新增弹框---start -->
        <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="700px" @close="closeDialog('formAdd')">
            <el-form :label-position="labelPosition"  :label-width="labelWidth" :rules="rulesAdd" :inline="true" :model="formAdd" ref='formAdd' class="demo-form-inline">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formAdd.name" placeholder="姓名" ></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="formAdd.city" placeholder="地址" ></el-input>
                </el-form-item>
                 <el-form-item label="类别" prop="type">
                    <el-select v-model="formAdd.type" placeholder="类别">
                        <el-option label="留言" value=1></el-option>
                        <el-option label="建议" value=2></el-option>
                        <el-option label="BUG" value=3></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄" prop="age">
                    <el-input  v-model="formAdd.age" placeholder="年龄" ></el-input>
                </el-form-item>
                 <el-form-item label="性别" prop="gender">
                    <el-select v-model="formAdd.gender" placeholder="性别" >
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="qq" prop="qq">
                    <el-input v-model="formAdd.qq" placeholder="qq" ></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增弹框---end -->
    </div>
</template>

<style lang="scss">
// 设置输入框的宽度
.el-form-item__content {
    width: 220px;
}
</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'messageboard',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 0,
                pageSize: 5,
                pageTotal: 80
            },
            formSearch: { //表单查询
                name: '',
                city:'',
                type:1,
                age:'',
                gender:1,
                qq: ''
            },
             formAdd: { //表单添加
                name: '',
                city:'',
                type:null,
                age:'',
                gender:null,
                qq: ''
            },
            rulesAdd:  {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
                ],
                city:[{ required: true, message: "请输入城市", trigger: "blur" }]
                ,
                type: [{ required: true, message: "请选择类别", trigger: "change" }],
                gender: [{ required: true, message: "请选择性别", trigger: "change" }]
            },
            formEdit: { //表单编辑
                name: '',
                city:'',
                type:1,
                age:'',
                gender:1,
                qq: ''
            },
            formEditTitle:'编辑',//编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            tableData: [  //表单列表
                {   id:"1",
                    createtime: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                     id:"2",
                    createtime: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                     id:"3",
                    createtime: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id:"4",
                    createtime: "2016-05-03",
                    name: "张紫宁",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            dialogEidtVisible: false,   //编辑弹框显示
            dialogAddVisible: false,    //添加弹框显示
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    computed:{
        
    },
    filters: {
        convertType: function (type) {
            if(type==1){
                return '留言';
            }
            else if(type==2)
            {
                return '建议';
            }
            else if(type==3){
                return 'BUG';
            }
        }
    },
    mounted(){
        this.onSearch();
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            apis.msgApi.getList(param)
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
                    
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.pageInfo.pageTotal=json.count;
                            this.tableData=json.data;
                        }
                        else if (json.message) {
                            alert(json.message);
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                alert('查询异常，请重试');
            });
        },
        /**
         * 保存
         */
        save() {
            this.$refs["formAdd"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formAdd);
                    apis.msgApi.add(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.dialogAddVisible = false;
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }
                
                
            });
        },
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.formEditDisabled=false;
            this.formEdit=rowData;
            this.dialogEidtVisible = true;
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.formEditDisabled=true;
            this.formEdit=rowData;
            this.dialogEidtVisible = true;
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            // 点击取消 数据重置
            this.$refs[formName].resetFields();
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.$message({
                message: '第' + this.pageInfo.currentPage + '页，' + 'size:' + this.pageInfo.pageSize,
                type: "success"
            });
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
       
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$message({
                message: '选中的项是:' + JSON.stringify(this.multipleSelection),
                type: "success"
            });
        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id).join();
            this.$message({
                message: '删除的项是:' + JSON.stringify(this.multipleSelection),
                type: "success"
            });
        },
         /**
         * 删除
         */
        handleDelete(index, rowData) {
            var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!' + msg
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    }
};
</script>
