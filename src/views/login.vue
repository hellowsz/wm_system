<template>
  <div class="flex">
    <div class="login-form">
      <el-form label-position="top" :model="formData">
        <el-form-item label="用户名">
          <el-input class="userInput" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex-between">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
};
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
  height: 450px;
  width: 350px;
}
.userInput .el-input__inner {
  width: 300px;
}
</style>
