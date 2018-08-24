<template >
    <!-- 查询区----start -->
    <div class="container">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="false" :model="formInline" class="demo-form-inline">
            <div class="container_item">
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="活动区域">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item label="审批人">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                </div>
                <div class="input_item">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
    <!-- 查询区----end -->
</template>
<style lang="scss">
$input_item_width:300px; //输入项宽度
$input_item_lable:80px; //lable宽度,跟实体中相同
.container_item {
    display: flex;
    flex-flow: row wrap;
    .input_item {
        flex: 0 0 $input_item_width; // float: left;//用float或者flex布局
        width: $input_item_width;
        input {
            width: $input_item_width - $input_item_lable;
        }
    }
}
</style>

<script>
export default {
    name: 'searchinput',
    data() {
        return {
            formInline: {   //表单对象
                user: '',
                region: ''
            },
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px'   //lable宽度
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>