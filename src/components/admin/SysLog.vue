<template>
    <section>
        <div class="table"> <!-- 页面表格begin -->
            <div class="crumbs"> <!-- 页面标题begin -->
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-tickets"></i>车贷进件日志</el-breadcrumb-item>
                </el-breadcrumb>
            </div> <!-- 页面标题end-->
            <div class="container"><!-- 页面内容区begin -->
                <div class="handle-box"> <!-- 搜索区begin -->
                    <!--工具条-->
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                        <el-form :inline="true" :model="filters" ref="test">

                            <el-form-item pro="orderNumber" label="订单编号:">
                                <el-input v-model="filters.orderNumber" placeholder="订单编号"
                                          style="width:200px; heght:30px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item pro="status" label="状态:">
                                <el-select size="mini" v-model="filters.status" placeholder="请选择" clearable>
                                    <el-option v-for="item in StatusData" :key="item.value" :label="item.dictDetailName"
                                               :value="item.dictDetailValue"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="操作动作:">
                                <el-select size="mini" v-model="filters.operationAction" placeholder="请选择" clearable>
                                    <el-option v-for="item in roleTypeData" :key="item.value"
                                               :label="item.dictDetailName" :value="item.dictDetailValue">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                创建时间 :
                                <el-date-picker
                                        v-model="filters.creationTime"
                                        type="daterange"
                                        range-separator="-"
                                        unlink-panels
                                        size="mini"
                                        format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        start-placeholde="开始日期"
                                        end-placeholde="结束日期">
                                </el-date-picker>
                            </el-form-item>


                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="getResult(1)" size="mini">搜索
                                </el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="reset()" size="mini">重置
                                </el-button>
                                <el-button type="success" icon="el-icon-edit" @click="handleAdd()" size="mini">执行报文
                                </el-button>
                                <el-button type="success" icon="el-icon-info" @click="handlePuth()" size="mini">推送消息
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </div> <!-- 搜索区end -->


                <template>
                    <!--表格数据及操作-->
                    <el-table :data="tableData" size="mini" highlight-current-row border class="el-tb-edit"
                              ref="multipleTable" tooltip-effect="dark">
                        <!--索引-->
                        <el-table-column type="index" align="center" label="序号"></el-table-column>


                        <el-table-column prop="orderNumber" label="订单编号" align="center" width="200">
                            <template slot-scope="scope">
                                <el-button @click="handleSelect(scope.$index,scope.row)" type="text">
                                    {{scope.row.orderNumber}}
                                </el-button>
                            </template>
                        </el-table-column>

                        <el-table-column align="center" width="220" prop="operationAction"
                                         label="操作动作 "></el-table-column>

                        <el-table-column :formatter="this.$common.dateFormat" align="center" width="160"
                                         prop="creationTime" label="创建时间 "></el-table-column>

                        <el-table-column label="日志状态" width="100" align="center">
                            <template slot-scope="scope">
                                <div v-if="scope.row.errJson  === ''">
                                    <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
                                </div>
                                <div v-if="scope.row.errJson  != ''">
                                    <el-button type="danger" icon="el-icon-error" size="mini" circle></el-button>
                                </div>
                            </template>
                        </el-table-column>

                        </el-table-column>

                    </el-table>
                </template>
                <br>
                <br>
                <!-- 分页 -->
                <el-pagination @current-change="getResult" :current-page="currentPage" :page-size="pageSize"
                               layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div><!-- 页面内容区end-->
        </div><!-- 页面表格end -->
        <!--新增界面-->


        <el-dialog title="执行报文" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="addForm" ref="addForm" label-width="130px" :rules="addFormRules">
                <el-form-item label="进件报文: " prop="reqJson">
                    <el-input type="textarea" :rows="20" :cols="62" v-model="addForm.reqJson" auto-complete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="ExeSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>


        <el-dialog title="推送消息" :visible.sync="puthVisible" :close-on-click-modal="false">
            <el-form :model="puthForm" ref="puthForm" :rules="addFormRules">


                <el-form-item label="订单编号: " pro="orderNumber">
                    <el-input v-model="puthForm.orderNumber" placeholder="订单编号"
                              style="width:260px; heght:30px;"></el-input>
                </el-form-item>
                <el-form-item label="推送状态: ">
                    <el-select style="width:260px; heght:30px;" v-model="puthForm.operationAction" placeholder="请选择"
                               clearable>
                        <el-option v-for="item in StatusputData" :key="item.value"
                                   :label="item.dictDetailName" :value="item.dictDetailValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="puthVisible = false">取消</el-button>
                <el-button type="primary" @click="ExePuthSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--详细界面-->
        <el-dialog title="详细信息" :visible.sync="selectFormVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="selectForm" label-width="130px" ref="selectForm">


                <template>
                    <div v-if="selectForm.errJson  != ''">
                        <el-form-item label=" 失败原因: " prop="errJson">
                            <el-input type="textarea" :rows="20" :cols="62" v-model="selectForm.errJson"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                    </div>
                </template>
                <el-form-item label=" 请求json: " prop="reqJson">
                    <el-input type="textarea" :rows="20" :cols="62" v-model="selectForm.reqJson"
                              auto-complete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectFormVisible = false">取消</el-button>
            </div>
        </el-dialog>


    </section>
</template>
<script>
    export default {
        data() {
            return {
                roleTypeData: [],
                StatusData: [],
                StatusputData: [],
                //搜索区域参数
                filters: {
                    orderNumber: "",
                    operationAction: "",
                    status: "",
                    creationTime: ""

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
                puthVisible: false,
                //添加按钮Loading加载
                addLoading: false,
                //输入框验证
                addFormRules: {
                    orderNumber: [{required: true, message: "订单编号", trigger: "blur"}]
                    , operationAction: [{required: true, message: "操作动作", trigger: "blur"}]
                    , reqJson: [{required: true, message: "请求json", trigger: "blur"}]
                    , errJson: [{required: true, message: "失败原因", trigger: "blur"}]
                    , creationTime: [{required: true, message: "创建时间", trigger: "blur"}]
                    , updateTime: [{required: true, message: "修改时间", trigger: "blur"}]
                },
                //新增界面数据
                addForm: {
                    orderNumber: ""
                    , operationAction: ""
                    , reqJson: ""
                    , errJson: ""
                    , creationTime: ""
                    , updateTime: ""
                },
                puthForm: {
                    orderNumber: ""
                    , operationAction: ""
                    , reqJson: ""
                    , errJson: ""
                    , creationTime: ""
                    , updateTime: ""
                },
                //查看详细
                selectForm: {
                    orderNumber: ""
                    , operationAction: ""
                    , reqJson: ""
                    , errJson: ""
                    , creationTime: ""
                    , updateTime: ""
                },
                //详细界面是否显示
                selectFormVisible: false,
                //编辑界面是否显示
                editFormVisible: false,
                //编辑界面数据
                editForm: {
                    orderNumber: ""
                    , operationAction: ""
                    , reqJson: ""
                    , errJson: ""
                    , creationTime: ""
                    , updateTime: ""
                }
            };
        },
        methods: {
            getResult: function (val) {
                var _this = this;
                this.listLoading = true;

                let param = Object.assign(
                    {},
                    {
                        currentPage: val,
                        pageSize: 10,
                        orderNumber: this.filters.orderNumber,
                        creationTimeSta: this.filters.creationTime[0],
                        creationTimeEnd: this.filters.creationTime[1],
                        operationAction: this.filters.operationAction,
                        status: this.filters.status

                    }
                );
                this.$ajax({
                    method: "post",
                    url: "/api/web-CarLoanLogRest-api/queryEntityCarLogList",
                    data: param
                }).then(function (resultData) {
                    _this.tableData = resultData.data.data;
                    _this.count = resultData.data.count;
                    _this.listLoading = false;
                });
            }
            ,
            getList: function (code, falg) {
                var _this = this;
                this.listLoading = true;
                let param = new URLSearchParams();
                param.append("code", code);
                this.$ajax({
                    method: "post",
                    url: "/api/execute/api/sysDict/Web/searchCodeSysDictDetail",
                    data: param
                }).then(
                    function (resultData) {
                        if (falg == '1') {
                            _this.roleTypeData = resultData.data.data;
                        } else if (falg == '2') {
                            _this.StatusData = resultData.data.data;
                        } else if (falg == '3') {
                            _this.StatusputData = resultData.data.data;
                        }
                        ;
                    },
                    function (resultData) {
                    }
                );
            },
            reset() {
                this.filters.orderNumber = ""
                this.filters.creationTime = ""
                this.filters.operationAction = ""
                this.filters.status = ""
            }
            ,
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
            },

            handlePuth: function () {
                this.puthVisible = true;
            },
            ExeSubmit: function () {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$confirm("确认推送吗？", "提示", {}).then(() => {
                            this.addLoading = true;
                            let param = Object.assign({}, {
                                    reqjson: this.addForm.reqJson
                                }
                            );
                            this.$ajax({
                                method: "post",
                                url: "/api/PushMessage-api/insertInfo",
                                data: param
                            }).then(res => {
                                this.addLoading = false;
                                this.$message({
                                    message: "推送成功",
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
            ExePuthSubmit: function () {

                if (this.puthForm.orderNumber == "") {
                    this.$message({
                        message: "请输入订单编号",
                        type: "error"
                    });
                    return;
                }
                if (this.puthForm.operationAction == "") {
                    this.$message({
                        message: "请选择推送状态",
                        type: "error"
                    });
                    return;
                }
                this.$confirm("确认推送吗？", "提示", {}).then(() => {
                    this.addLoading = true;
                    let param = Object.assign({}, {
                            orderNumber: this.puthForm.orderNumber,
                            status: this.puthForm.operationAction
                        }
                    );
                    this.$ajax({
                        method: "post",
                        url: "/api/PushMessage-api/Stateofjudgment",
                        data: param
                    }).then(res => {
                        this.addLoading = false;
                        this.$message({
                            message: "推送成功",
                            type: "success"
                        });
                        this.$refs["puthForm"].resetFields();
                        this.puthVisible = false;
                        this.getResult(1);
                    });
                });
            },
            //查看详细信息
            handleSelect: function (index, row) {
                this.selectFormVisible = true;
                this.selectForm = Object.assign({}, row);
            }


        },
        mounted() {
            //初始加载
            this.getResult(1);
            this.getList('CAR_LOG_TYPE', 1);
            this.getList('IS_OK', 2);
            this.getList('PUSH_STATUS', 3);

        }
    };
</script>

