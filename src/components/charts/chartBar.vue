<template>
  <div class="EchartPractice">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: "chartBar",
  data() {
    return {
      option:{
        xdata:[],
        ydata:[],
      }
    }
  },
  methods: {
    drawChart() {
      let myEchart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "已容纳/总容量",
        },
        tooltip: {},
        legend: {
          data: ["已容纳货物数量"],
        },
        xAxis: {
          name: "最大",
          type: "value",
          max: 100,
          splitLine: {
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false,
          },
          axisTick: { show: false },
        },
        yAxis: {
          data: ["一号仓库", "二号仓库", "三号仓库", "四号仓库"],
          type: "category",
          splitLine: {
            show: false,
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false,
          },
          axisTick: { show: false },
        },
        series: [
          {
            name: "已容纳货物数量",
            type: "bar",
            data: [50, 60, 45, 30],
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
              barBorderRadius: [20, 20, 20, 20],
            },
            itemStyle: {
              // 图形的形状
              barBorderRadius: [20, 20, 20, 20],
              color: "#37e9fc",
            },
          },
        ],
        axisLine: {
          // 坐标轴 轴线
          show: false, // 是否显示
        },
      };
      myEchart.setOption(option);
    },
  },
  created() {

  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style scoped>
#main {
  width: 600px;
  height: 300px;
  margin: 0;
  /* margin-top: 100px */
}
</style>
