

<template>
    <div class="echarts">
        <div id="echart"></div>
    </div>
</template>
 
<script>
import Echarts from 'echarts'
export default {
    data() {
        return{
            myChart: {}
        }
    },
    props: {
        echartObj: {
            type: Object,
            default: {}
        }
    },
    created() {
        this.$nextTick(()=> {
            this.loadEchart()
        })
    },
    mounted(){
        let _this = this;
        window.onresize = function() {
            _this.myChart.resize()
        }
    },
    methods: {
        loadEchart() {
            this.myChart = Echarts.init(document.getElementById("echart"));
            this.myChart.setOption({
                title: {
                    text: this.echartObj.title.text
                },
                tooltip: {},
                xAxis: {
                    data: this.echartObj.xAxis.data
                },
                yAxis: {},
                legend: this.echartObj.legend,
                series: this.echartObj.series
            })
        }
    }
}
</script>
 
<style>
#echart {
  width: 600px;
  height: 300px;
  margin: 0;
  /* margin-top: 100px */
}
</style>