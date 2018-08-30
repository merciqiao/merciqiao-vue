<template>
    <div class="container">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formSearch" class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="formSearch.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
                <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="onSubmit">查询</el-button>
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
        <el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column prop="date" label="日期" width="180" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180" sortable>
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.pageIndex" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="700px">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formEdit.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="formEdit.address" placeholder="地址"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="日期" v-model="formEdit.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formEdit.other" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formEdit.other" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formEdit.other" placeholder="审批人"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->

        <!-- 新增弹框---start -->
        <el-dialog title="新增记录" :visible.sync="dialogAddVisible" width="700px">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formAdd" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formAdd.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="formAdd.address" placeholder="地址"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="日期" v-model="formAdd.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-input v-model="formAdd.other" placeholder="审批人"></el-input>
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
export default {
    name: 'tablepage',
    data() {
        return {
            pageInfo: {
                pageIndex: 3,
                pageSize: 5,
                pageTotal: 80
            },
            tableData: [
                {   id:"1",
                    date: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                     id:"2",
                    date: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                     id:"3",
                    date: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                     id:"4",
                    date: "2016-05-03",
                    name: "张紫宁",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            formSearch: {   //表单对象
                user: '',
                region: ''
            },
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px',  //lable宽度
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            dialogFormVisible: false,
            dialogAddVisible: false,
            formLabelWidth: '120px',
            formAdd: {
                //表单对象
                name: "",
                address: "",
                date: "",
                other: ""
            },
            formEdit: {
                //表单对象
                name: "",
                address: "",
                date: "",
                other: ""
            },
            multipleSelection: []
        };
    },
    methods: {
        handleEdit(index, rowData) {
            var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            this.$message({
                message: msg,
                type: "success"
            });
            this.formEdit=rowData;
            this.dialogFormVisible = true;
        },
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

        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.$message({
                message: '第' + this.pageInfo.pageIndex + '页，' + 'size:' + this.pageInfo.pageSize,
                type: "success"
            });
        },
        handleCurrentChange(val) {
            this.pageInfo.pageIndex = val;
            this.$message({
                message: '第' + this.pageInfo.pageIndex + '页，' + 'size:' + this.pageInfo.pageSize,
                type: "success"
            });

        },
        onSubmit() {
            console.log('submit!');
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$message({
                message: '选中的项是:' + JSON.stringify(this.multipleSelection),
                type: "success"
            });
        },
        deleteMany() {
            var ids= this.multipleSelection.map(item => item.id).join();
            this.$message({
                message: '删除的项是:' + JSON.stringify(this.multipleSelection),
                type: "success"
            });
        },
        save() {
            let param = Object.assign({}, this.formAdd);
            this.tableData.push(param);
            this.dialogAddVisible = false;
        }
    }
};
</script>
