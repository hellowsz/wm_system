<template>
    <div class="filter-table">
        <div class="query-table-div">
            <el-row :gutter='8' type='flex' align='middle' class="query-table" v-bind:style="{'width':tableWidth+'px'}" >
              <template v-for="(rowItem, index) in filterData">
                <template  :ref="'li'+index" v-if="offsetWidth<=1288?(index>=4?showMore:true):offsetWidth >=1632 ?index>=8?showMore:true:index>=6?showMore:true">
                  <el-col :span='offsetWidth<=1288?4:offsetWidth >=1632 ?2:3'  class="from-title" :key="rowItem.name"><span v-show="rowItem.isRequired" class="filter-item-isRequired">*</span>{{rowItem.label}}</el-col>
                  <el-col :span='offsetWidth<=1288?8:offsetWidth >=1632 ?4:5' class="from-value" :key="'value-'+rowItem.name">
                    <!-- <filter-item class="filter-item" :ref='rowItem.name' :data="rowItem" @change="relaFieldChange"></filter-item> -->
                  </el-col>
                </template>
              </template>
            </el-row>
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
    //   let rela = this.dataList.find(item => item.name === res.relaName)
    //   if(rela){
    //     rela.fun && rela.fun(res, rela)
    //   }
    },
    init (data) {
      this.initData = $.extend(true, [], data)// JSON.stringify(data)
      this.dataList = $.extend(true, [], data)//JSON.parse(JSON.stringify(data))

      // this.offsetWidth = document.body.offsetWidth
    },

  }

}
</script>
<style scoped>
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
  display: inline-block;
    margin-left:20px;
    margin-right:16px;
}
</style>