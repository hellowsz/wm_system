<template>
  <div class="locationTable">
    <el-form :model="form" class="searchTable">
      <el-radio-group v-model="selectBy" @change="changeSelectType">
        <el-radio label="1" border>名称</el-radio>
        <el-radio label="0" border>ID</el-radio>
      </el-radio-group>
      <el-row>
        <el-col :span="18">
          <el-form-item v-if="+selectBy">
            <el-input
              v-model="form.wareHouseName"
              placeholder="仓库名称"
              prefix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
          <el-form-item v-else>
            <el-input
              v-model="form.wareHouseID"
              placeholder="仓库ID"
              prefix-icon="el-icon-search"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item style="margin-left:2px">
            <el-button type="primary" @click="selectTable">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="infoTable">
        <div @click="chooseItem(item)" class="infoItem" v-for="(item,index) in tableData.dataInfo" :key="index">{{item.wareHouseName}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "locationTable",
  components: {},
  data() {
    return {
      selectBy: "1",

      form: {
        wareHouseName: "",
        wareHouseID: "",
      },
      tableData:{
          dataInfo:[]
      }
    };
  },
  methods: {
    changeSelectType() {},
    chooseItem(item) {
      this.$emit("markLocation",{...item})
    },
    selectTable() {
        this.tableData.dataInfo = [
        {wareHouseName:"成都市花牌坊",wareHouseID:"610000",position:{lng: 104.055001, lat: 30.689524}},
        {wareHouseName:"成都市人民公园",wareHouseId:"600000",position:{lng:104.058029,lat:30.657909}}]
    }
  },
};
</script>
<style scoped>
.locationTable {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  /* background-color: aqua; */
}
.searchTable {
  display: flex;
  flex-direction: column;
}
.el-radio.is-bordered {
  border: 0px;
}
.el-form {
  width: 100%;
}
.el-input__inner{
    height: 5px !important;
}
.infoTable{
    border-top: 1px solid #f5f5f5;
    width: 100%;
    height: 100%;
    /* background-color: brown; */
}
.infoItem{
    font-size: 12px;
    padding: 7px 10px 7px 30px;
    cursor: pointer;
}
.infoItem:hover{
  background-color:  rgba(239,249,250,1);
  font-size: 12px;
  padding: 7px 10px 7px 30px;
}
</style>
