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
            <el-button size="small" round type="primary">新增</el-button>
            <el-button size="small" round type="danger">批量删除</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" border stripe style="width: 100%">
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
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->
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
                {
                    date: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
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
            formLabelWidth: '120px'


        };
    },
    methods: {
        handleEdit(index, rowData) {
            var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            this.$message({
                message: msg,
                type: "success"
            });
            this.dialogFormVisible = true;
        },
        handleDelete(index, rowData) {
            var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
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
        }
    }
};
</script>
