<template>
  <div>
    <el-form :model="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.name" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {apiLogin} from "@/request/api/admin";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      apiLogin(this.loginForm).then(response => {
        if (response.code === 0) {
          localStorage.setItem('JWT_TOKEN', response.data);
          this.$router.push({name: 'Home'})
        }
      })
    },
    reset() {
      this.loginForm.name = '';
      this.loginForm.password = '';
    }
  }
}
</script>

<style scoped>

</style>