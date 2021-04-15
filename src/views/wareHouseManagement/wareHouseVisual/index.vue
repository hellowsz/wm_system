<template>
  <el-container direction="vertical" class="content">
    <el-row class="top">
      <el-col :span="12" class="topLeft">
        <chart-bar></chart-bar>
      </el-col>
      <el-col :span="12" class="topRight">
        <chart-item :echartObj="line"></chart-item>
      </el-col>
    </el-row>
    <el-row class="bottom">
      <el-col :span="12" class="bottomLeft"> </el-col>
      <el-col :span="12" class="bottomRight"></el-col>
    </el-row>

    <!-- <chart-line></chart-line> -->
    <!-- <dv-charts :option="option" /> -->
  </el-container>
</template>
<script>
import chartBar from "@/components/charts/chartBar.vue";
import chartItem from "@/components/charts/chartItem.vue";
export default {
  name: "wareHouseVisual",
  components: {
    chartBar,
    chartItem,
  },
  data() {
    return {
      line: {
        title: {
          text: "折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
.top {
  height: 50%;
}
.bottom {
  height: 50%;
}
.topLeft {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* background-color: aquamarine; */
}
.topRight {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: burlywood;
}
.bottomLeft {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: cornflowerblue;
}
.bottomRight {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: darkcyan;
}
</style>
