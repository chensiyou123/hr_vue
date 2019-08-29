<template>
  <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"  label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loading:false,
                loginForm:{
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
            }
        },
        methods:{
            submitClick(){
                let vm  = this;
                vm.loading = true;
                this.postRequest('/login',{
                    username: vm.loginForm.username,
                    password: vm.loginForm.password
                }).then(xhr=>{
                    this.loading = false;
                    if (xhr && xhr.status == 200) {
                        let data = xhr.data;
                        vm.$store.commit('login', data.obj);
                        let path = vm.$route.query.redirect;
                        vm.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
                    }
                })
            },
        }
    }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
