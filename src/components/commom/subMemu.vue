<template>
  <el-aside width="170px">
    <div class="usercard">
      <el-avatar shape="square" :size="100"> user </el-avatar>
      <div class="usercard-userinfo">
        <div class="userinfo">雾凇</div>
        <div class="userinfo">管理员</div>
      </div>
    </div>
    <el-menu default-active="2" unique-opened="true"
      ><!-- 导航选项 -->
      <el-submenu
        v-for="item in subMenuData"
        :key="item.index"
        :index="item.index"
      >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ item.label }}</span>
        </template>
        <div v-for="elMenuItem in item.elMenuItem" :key="elMenuItem.index" :index="elMenuItem.index" @click="clickHandler(elMenuItem.url)">
          <el-menu-item>{{ elMenuItem.name }}</el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      //侧边导航数据
      subMenuData: [
        {
          label: "仓储管理",
          index: "1",
          elMenuItem: [
            { name: "仓储信息", index: "11", url:"/wareHouseInfo" },
            { name: "快递站分布", index: "12", url:"/wareHouseReport"},
            { name: "快递站分布", index: "12", url:"/wareHouseVisual"}
          ],
        },
        {
          label: "快递员管理",
          index: "2",
          elMenuItem: [
            { name: "快递员信息", index: "21",url:"/courierInfo" },
            { name: "快递员分布", index: "22", url:'/courierDistribution' },
          ],
        },
        {
          label: "货物管理",
          index: "3",
          elMenuItem: [
            { name: "货物信息", index: "3-1" },
          ],
        },
      ],
    };
  },
  methods: {
    clickHandler (url) {
      // console.log(this.$router)
      this.$router.push(url)
    }
  }
};
</script>
