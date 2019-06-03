<template>
    <div class="container messageboard2">
        <div v-show="isTableShow">
            <!-- 查询区----start -->
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="formSearch.name" placeholder="模糊匹配"></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="formSearch.city" placeholder="城市"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="type">
                    <el-select v-model="formSearch.type" placeholder="活动区域">
                        <el-option label="留言" value="1"></el-option>
                        <el-option label="建议" value="2"></el-option>
                        <el-option label="BUG" value="3"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="年龄" prop="age">
                    <el-input type="number" v-model="formSearch.age" placeholder="年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="formSearch.gender" placeholder="性别">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="qq号" prop="qq">
                    <el-input v-model="formSearch.qq" placeholder="qq号"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createtime">
                    <el-date-picker
                        v-model="formSearch.createtime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label=" " style="margin-left:50px;">
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="warning" plain @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
            <!-- 查询区----end -->
            <!-- 操作区----start -->
            <el-row class="mgb15">
                <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
                <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
            </el-row>
            <!-- 操作区----end -->
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60">
                </el-table-column>
                <el-table-column prop="name" label="昵称" width="150" align="center" sortable>
                    <!-- <template slot-scope="scope">
                        <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
                    </template> -->
                </el-table-column>
                <el-table-column prop="city" label="城市" align="center" width="150">
                </el-table-column>
                <el-table-column prop="type" label="类别" align="center" width="150">
                    <template slot-scope="scope" align="center" width="150">
                        <span>{{ scope.row.type |convertType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" align="center" width="100">
                </el-table-column>
                <el-table-column prop="gender" label="性别" align="center" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.gender==1?'男':'女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createtime" label="创建日期" :formatter="this.$common.timestampToTime" width="180" sortable>
                </el-table-column>
                <el-table-column prop="updatetime" label="更新日期" :formatter="this.$common.timestampToTime" width="180" sortable>
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="230">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
            <!-- 表格---end -->
        </div>
        <div v-show="isEditShow">
            <!-- 编辑弹框---start -->
                <!-- <div>{{formEditTitle}}</div> -->
                <el-form :label-position="labelPosition" :label-width="labelWidth" :rules="rulesEdit" :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formEdit.name" placeholder="姓名" ></el-input>
                    </el-form-item>
                    <el-form-item label="城市" prop="city">
                        <el-input v-model="formEdit.city" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="type">
                        <el-select v-model="formEdit.type" placeholder="类别">
                            <el-option label="留言" value="1"></el-option>
                            <el-option label="建议" value="2"></el-option>
                            <el-option label="BUG" value="3"></el-option>
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
                        <el-input v-model="formEdit.qq" placeholder="QQ号"></el-input>
                    </el-form-item>
                    <el-form-item class="_editor">
                        <!-- 留言编辑器---start -->
                        <div  class="document-editor" >
                                <!-- 工具栏容器 start -->
                                <div v-show="!formEditDisabled" class="document-editor__toolbar"></div>
                                <!-- 工具栏容器 end -->

                                <!-- 编辑器容器 start -->
                                <div class="document-editor__editable-container">
                                    <div class="document-editor__editable">
                                        <p>CSDN同款富文本编辑器，支持将截图直接粘贴进来</p>
                                    </div>
                                </div>
                                <!-- 编辑器容器 end -->
                        </div>
                        <!-- 留言编辑器---end -->
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeEdit">取 消</el-button>
                    <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">{{editBtnText}}</el-button>
                </div>
            <!-- 编辑弹框---end -->

            
        </div>
        

    </div>
</template>

<style lang="scss">
// 设置输入框的宽度
.messageboard2{
    .el-input {
        width: 220px;
    }
    ._editor{
        width:100%;
        .el-form-item__content{
            width:100%;
            .document-editor{
                border:1px solid #c4c4c4;
                .document-editor__toolbar{
                    border:0;
                    border-bottom:1px solid #c4c4c4;
                    .ck-toolbar{
                        border:0;
                    }
                }
                .document-editor__editable{
                    min-height: 400px;
                    border:0;
                }
            }
            
        }
        
    }
   
}

</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'messageboard2',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formSearch: { //表单查询
                name: '',
                city:'',
                type:null,
                age:'',
                gender:null,
                qq: '',
                startdate:null,
                enddate:null
            },
            formEdit: { //表单编辑
                id:null,
                name: '',
                city:'',
                type:'',
                age:'',
                gender:null,
                qq: '',
                text:''
            },
             rulesEdit:  {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
                ],
                city:[{ required: true, message: "请输入城市", trigger: "blur" }]
                ,
                type: [{ required: true, message: "请选择类别", trigger: "change" }],
                gender: [{ required: true, message: "请选择性别", trigger: "change" }]
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogType:'',//弹框类型：add,edit,show
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
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: [],
            isTableShow:true,//表格显示
            isEditShow:false,//编辑区显示
            editBtnText:'',//编辑按钮文本
            EditorObj: null,//编辑器实例
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
        this.initCKEditor()
        var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + "-增删改查页二"
        };
        apis.shiroApi.loginLog(loginLog);
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;
        
            if(this.formSearch.createtime){
                this.formSearch.startdate=this.formSearch.createtime[0];
                this.formSearch.enddate=this.formSearch.createtime[1];
            }
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
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        /**
         * 点击保存按钮
         */
        handleSave(){
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
        /**
         * 保存
         */
        save() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    param.text=this.EditorObj.getData();
                    apis.msgApi.add(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.closeEdit();
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
         * 更新
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    param.text=this.EditorObj.getData();
                    apis.msgApi.update(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.closeEdit();
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
         * 删除
         */
        handleDelete(index, rowData) {
            if(rowData.name=='使用文档'){
                this.$message('使用文档不可删除');
                return;
            }
            var id=rowData.id;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.delete({id:id})
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            debugger;
                            this.onSearch();
                        });
                    })
                    .catch((err)=>{
                        debugger;
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });

        },
        /**
         * 批量删除
         */
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            debugger;
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.deleteBatch({ids:ids})
                        .then((data)=>{
                            this.$common.isSuccess(data,()=>{
                                debugger;
                                this.onSearch();
                            });
                        })
                        .catch((err)=>{
                            debugger;
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });
                    
                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
        /**
         * 打开新增页
         */
        handleAdd() {
            this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.editBtnText='保存';
                this.formEditDisabled=false;
                this.EditorObj.isReadOnly=false;
                this.EditorObj.setData('CSDN同款富文本编辑器，支持将截图直接粘贴进来');
            });
        },
        /**
         * 打开编辑页
         */
        handleEdit(index, rowData) {
            this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.editBtnText='保存修改';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
                this.EditorObj.setData(this.formEdit.text==null?'':this.formEdit.text);
                this.EditorObj.isReadOnly=false;
            });
            
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            if(rowData.name=='使用文档'){
                var loginLog={
                                ip:returnCitySN["cip"],
                                city:returnCitySN["cname"]+'-查看使用文档',
                                type:'查看使用文档'
                            };
                            
                            apis.shiroApi.loginLog(loginLog);
            }
            this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
                this.EditorObj.setData(this.formEdit.text==null?'':this.formEdit.text);
                
                this.EditorObj.isReadOnly=true;
            });
        },
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        },
        /** 
         * 打开编辑页
         */
        openEdit(){
            this.isTableShow=false;
            this.isEditShow = true;
            // this.$nextTick(()=>{
            //     this.initCKEditor()
            // });
        },
         /** 
         * 关闭编辑页
         */
        closeEdit(){
            this.$refs['formEdit'].resetFields();
            this.isTableShow=true;
            this.isEditShow = false;
            
        },
         //初始化容器
        initCKEditor() {
            DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: '/api/img-api/upload'
                }
            })
            .then(editor => {
                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);//添加工具栏
                    this.EditorObj = editor;
                    console.log('初始化富编辑器');
            })
            .catch(err => {
                    console.error(err);
                    console.log('初始化富编辑器失败');
            });
        }
        
        
    }
};
</script>
