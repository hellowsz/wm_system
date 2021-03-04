<template>
    <div class="filter-table">
        <div class="query-table-div">
            <el-row :gutter='8' type='flex' align='middle' class="query-table" v-bind:style="{'width':tableWidth+'px'}" >
              <template v-for="(rowItem, index) in filterData">
                <template  :ref="'li'+index" v-if="offsetWidth<=1288?(index>=4?showMore:true):offsetWidth >=1632 ?index>=8?showMore:true:index>=6?showMore:true">
                  <el-col :span='offsetWidth<=1288?4:offsetWidth >=1632 ?2:3'  class="from-title" :key="rowItem.name"><span v-show="rowItem.isRequired" class="filter-item-isRequired">*</span>{{rowItem.label}}</el-col>
                  <el-col :span='offsetWidth<=1288?8:offsetWidth >=1632 ?4:5' class="from-value" :key="'value-'+rowItem.name">
                    <filter-item class="filter-item" :ref='rowItem.name' :data="rowItem" @change="relaFieldChange"></filter-item>
                  </el-col>
                </template>
              </template>
            </el-row>
        </div>
        <div v-show="!isNotShowQuery" class="filter-button">
          <el-button @click="callback" type="primary">{{ btnName }}</el-button>
          <el-button @click="addCallback" type="primary" v-show="isShowAdd?isShowAdd:false">{{ addnew }}</el-button>
          <el-button @click="clearFilter" type="default"  v-show="isShowClear?isShowClear:false">清空</el-button>
          <el-button type="primary" v-show="offsetWidth > 1632 && filterData.length>8 || offsetWidth <= 1632 && filterData.length>6 || offsetWidth <= 1288 && filterData.length>4"
          @click="changeShowMore" >{{showMore?'收起':'更多'}}{{ btnMoreName }}</el-button>
    </div>
    </div>
</template>
<script>
import filterItem from '@/components/filter/components/filterItem.vue'
import { mapState } from 'vuex'
export default {
    name: 'tableFilter',
  components: {
    filterItem
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    btnName: {
      type: String,
      default: '查询'
    },
    isShowAdd: {
      type: Boolean,
      default: false
    },
    isShowClear: {
      type: Boolean,
      default: true
    },
    isNotShowQuery: {
      type: Boolean,
      default: false
    },
    addnew: {
      type: String,
      default: '新增'
    },
    btnMoreName: {
      type: String,
      default: '查询条件'
    }
  },
  computed: {
    ...mapState({
      offsetWidth: state => state.common.filterTableWidth
    }),
    tableWidth () {
      return this.offsetWidth - 30 - 320 - 30
    }
  },
  data() {
      return {
        filterData: [],
        showMore: false,
        initFilterData: '',
        initData: [], // 存储初始的条件str
        dataList: [],
        thirdPlugIDList: [],
        thirdComponentsList: [],
        isQuery: 0
      }
  },
  created () {
    this.init(this.data)
  },
  methods: {
      relaFieldChange(res){
      let rela = this.dataList.find(item => item.name === res.relaName)
      if(rela){
        rela.fun && rela.fun(res, rela)
      }
    },
    init (data) {
      this.initData = $.extend(true, [], data)// JSON.stringify(data)
      this.dataList = $.extend(true, [], data)//JSON.parse(JSON.stringify(data))

      // this.offsetWidth = document.body.offsetWidth
      this.initFilterDataHandle()
    },
    // 新增按钮的回调
    addCallback () {
      this.$emit('addCallback')
    },
    initFilterDataHandle () {
      let $this = this
      $this.filterData = []
      this.dataList.forEach(function (item, index) {
        $this.filterData.push(item)
      })
    },
    callback () {
      this.isQuery = 1
      this.$emit('callback', this.dataList)
    },
    changeShowMore () {
      this.showMore = !this.showMore
    },
    clearFilter () {
      var $this = this
      let initData = $.extend(true, [], this.initData)//JSON.parse(this.initData)
      for(let initItem of initData) {
        if(initItem.type === 'autocomplete') {
          initItem.value = ''
          initItem.code = ''
        }else if(initItem.canDeleteDefault && initItem.value ){//若canDelete=true则清除默认
          initItem.value = ''
        }
      }
      this.dataList = $.extend(true, [], initData)//initData
      this.thirdPlugIDList.forEach(item => {
        $(item).val('')
      })
      this.thirdComponentsList.forEach(item => {
        if ($this.$refs[item]) {
          $this.$refs[item][0].clearValue()
        }
      })
      this.thirdPlugIDList = []
      this.initFilterDataHandle()
    }

  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        if (!this.isQuery) {
          this.init(newValue)
        }
      },
      deep: true
    }
  }

}
</script>
<style scoped>
@media screen and  (min-width: 1635px) {
  .query-table{
    width:1200px;
 }
}
@media screen and  (min-width: 1860px) {
  .query-table{
    width:1360px;
  }
}

.filter-item-isRequired{
  color: red;
  margin-right: 5px;
}
 /* 输入框及下拉框长度更改 */
.filter-table .el-input,
.filter-table .el-select,
.filter-table .el-date-editor.el-input,
.filter-table .el-date-editor--datetimerange,
.filter-table .el-date-editor--timerange{
/* .filter-table .el-date-editor--datetimerange.el-input__inner , */
/* .filter-table .el-date-editor--daterange.el-input,
.filter-table .el-date-editor--daterange.el-input__inner,
.filter-table .el-date-editor--timerange.el-input,
.filter-table .el-date-editor--timerange.el-input__inner{ */
  width:100%;
}

.filter-table{
  margin: 10px 0 0 0;
  background: #fff;
  width:100%;
  box-sizing: border-box;
  padding-top:10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #DCDFE6;
}
.query-table-div{
  font-size: 14px;
  display: inline-block;
    margin-left:20px;
    margin-right:16px;
}
.from-title{
  min-width: 86px;
}
.query-table{
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row-wrap;
    flex-flow: wrap;
 }
  .query-table .el-col{
  margin:8px 0;
}
.query-table .filter-item{
  width: 100%;
  padding-right:12px;
  height: 32px;
}
.filter-table .filter-button{
  text-align: left;
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
  padding:7px 0;
  box-sizing: border-box;
  height: 32px;
}
</style>
<style>
.filter-table .el-input__suffix{
  right: 12px;
}
.filter-table .el-input__inner{
  height: 32px;
  right: 12px;
}
.filter-table .el-button{
  right: 12px;
  padding: 8px 20px;
  font-size: 14px;
}

</style>