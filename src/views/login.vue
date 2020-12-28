<template>
  <div class="flex">
    <div class="login-form">
      <el-form>
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
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
  data() {
    return {};
  },
};
</script>
<style>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
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
</style>
