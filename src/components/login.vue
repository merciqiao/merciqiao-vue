<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">后台管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        height: 296px;
        margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin:30px 80px auto 80px;
        }
    }
}
</style>

<script>
export default {
    name: 'login',
    data() {
        return {
            formLogin: {   //表单对象
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$router.push({ path: "/index" });
        }
    }
}
</script>
