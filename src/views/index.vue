<template>
  <el-container style="height: 100%;">
    <el-container>
      <!-- 侧边导航栏 -->
      <sub-memu></sub-memu>
      <el-container>
        <!-- 头部 -->
        <el-header></el-header>
        <!-- 内容 -->
        <el-container class="containerIndex">
          <transition>
            <router-view />
          </transition>
        </el-container>
        <!-- 尾部 -->
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import SubMemu from '../components/commom/subMemu.vue';
export default {
  name:"index",
  components:{
    SubMemu,
  },
  data() {
    return {
      
    };
  },
  // mounted () {
  //   this.$store.commit('common/SET_WINDOWWIDTH', document.body.offsetWidth)
  //   this.$store.commit('common/SET_WINDOWHEIGHT', document.body.offsetHeight)
  //   let $this = this
  //   window.onresize = () => {
  //     $this.$store.commit('common/SET_WINDOWWIDTH', document.body.offsetWidth)
  //     $this.$store.commit('common/SET_WINDOWHEIGHT', document.body.offsetHeight)
  //     $this.$store.commit('common/SET_FILTERTABLEWIDTH',
  //     document.getElementsByClassName('filter-table').length>0?document.getElementsByClassName('filter-table')[0].offsetWidth:document.body.offsetWidth) //销售结算网站有个菜单栏减去
  //   }
  //   window.onresize()
  // },
};
</script>
<style>
.content{
    height: calc(100% - 40px - 20px);
    overflow-y: auto;
    background-color: #fff;
    margin:10px;
    padding:0;
}
html,
body {
  margin: 0;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #b3c0d1;
  /* background-color: #d3dce6; */
  color: #333;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* .el-menu{
  background-color:#b3c0d1 ;
} */
.usercard {
  display: flex;
}
.usercard-userinfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.userinfo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
/* .left{
  position: relative;
  right: 45px;
} */
.containerIndex{
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
}
</style>
