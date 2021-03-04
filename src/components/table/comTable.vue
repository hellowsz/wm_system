<template>
<el-container direction="vertical" v-bind:style="{'height':tableHeight}">
  <div class="table-name" v-show="tableName"><span>{{tableName}}</span></div>
  <el-table ref="table" class="com-table" header-cell-class-name='ellipsis' :data="data.dataInfo" style="width: 100%;" height="600" :row-key="rowKey || 'keyID'" v-loading="loading"  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"  @sort-change="sortChange" @filter-change="filterChange"  @header-dragend="headerDragend"
  :reserve-selection='reserveSelection' @selection-change="handleSelectionChange" border >
   <template v-if="tableOperate && tableOperate.length > 0">
      <template  v-for="(item,i) in tableOperate">
        <td-item :key="item.index || item.fieldName" :index='i' :data="item" @handleRadioChange="handleRadioChange" class="is-hidden"></td-item>
      </template>
    </template>
    <template v-for="(item,i) in header">
      <template  v-if="(index!==undefined && showHeader.indexOf(item.fieldName)>-1) || index===undefined || showHeader.length===0">
        <td-item v-if="item.type!=='slot'" :key="item.index || item.fieldName" :index='i' :resizable='showHeader.indexOf(item.fieldName)!==(showHeader.length-1)' :data="item">
        </td-item>
        <td-item :key="item.index || item.fieldName"  :index='i' :resizable='showHeader.indexOf(item.fieldName)!==(showHeader.length-1)' :data="item" v-else>
          <span :slot="item.fieldName" slot-scope="scope">
            <slot :name="item.fieldName" :row="scope.scope.row" :data='scope.data'></slot>
          </span>
        </td-item>
      </template>
    </template>
   
  </el-table>
  <div class="table-footer">
    <slot></slot>
    <el-pagination v-show="showPage" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
    :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="data.totalCount">
  </el-pagination>
  </div>
</el-container>
</template>
<script>
import tdItem from './components/tdItem.vue'
import commonUtils from '@/assets/js/common.js'
/**
 * 列表常规显示组件（表头动态传入）
 * 显示效果：提供标题及列表数据，根据提供数据渲染，可控制单行的表头，固定列，数据转换，操作等功能
 * 回调函数：sortChange：表头排序回调 filterChange：表头筛选回调  pageChange:更改页面回调
 */
export default {
  name: 'comTable',
  components: {
    tdItem
  },
  props: {
    // 是否显示加载框
    loading: {
      type: Boolean,
      default: false
    },
    /** 表头
     * [{name:"旅客姓名",value:""}]
     */
    header: {
      type: Array,
      default () {
        return []
      }
    },
    showHeader: {
      type: Array,
      default () {
        return []
      }
    },
    tableOperate: {
      type: Array,
      default () {
        return []
      }
    },
    /** 列表数据
     *  {dataInfo:[{name:"旅客姓名",value:""}],totalCount:0}
     */
    data: {
      type: [Object, Array],
      default () {
        return {
          dataInfo: [],
          totalCount: 0
        }
      }
    },
    pageSize: {
      type: Number,
      default () {
        return 20
      }
    },
    pageSizes: {
      type: Array,
      default () {
        return [20, 50, 100, 200]
      }
    },
    currentPage: {
      type: Number,
      default () {
        return 1
      }
    },
    // 模块index，用于存储store中的用户习惯信息
    index: Number,
    showPage: {
      type: Boolean,
      default: true
    },
    tableName: String,
    // 是否跨页勾选
    reserveSelection: {
      type: Boolean,
      default: false
    },
    rowKey: String,
    tableHeight: {
      type: String,
    },
    // 是否固定高度
    fixedHeight: {
      type: Boolean,
      default: true
    },
      },
  data () {
    return {
      hasRightOperate: false,
      path: ''
    }
  },
  updated(){
    // console.log('更新了')
    this.$refs.table.doLayout()
  },
  mounted () {
    let $this = this
    this.tableOperate.forEach(item => {
      if (item.fixed && item.fixed === 'right') {
        $this.hasRightOperate = true
      }
    })
    // 这里不能去掉，如果去掉的话，选中固定左边的复选框会不见了
    this.$nextTick(function () {
      if (document.getElementsByClassName('el-table__fixed').length > 0) {
        Array.prototype.slice.call(document.getElementsByClassName('el-table__fixed')).forEach(item => {
          item.onscroll = function (i) {
            this.scrollLeft=0
            this.scrollTop=0
          }
        })
      }
     
    })
    // 处理动态路由
    if (this.$route.meta.dynamic) {
      this.path = this.$route.path.substr(0, this.$route.path.lastIndexOf('/'))
    } else {
      this.path = this.$route.path
    }
  },
  methods: {
    refreshHtml () {

    },
    sortChange () {
      this.$emit('sortChange')
    },
    filterChange () {
      this.$emit('filterChange')
    },
    doLayout () {
      this.$refs.table.doLayout()
    },
    handleSizeChange (pageSize) {
      if (this.index !== undefined) {
        this.$store.commit('common/SET_OPERATEHABIT_ITEM_PAGESIZE', { path: this.path, index: this.index, pageSize: pageSize, modifyTime: commonUtils.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss') })
      }
      this.$emit('pageChange', { pageSize: pageSize, currentPage: this.currentPage })
    },
    handleCurrentChange (currentPage) {
      this.$emit('pageChange', { pageSize: this.pageSize, currentPage: currentPage })
    },
    headerDragend (newWidth, oldWidth, column, event) {
      if (this.index !== undefined && column.index !== null) {
        this.$store.commit('common/SET_OPERATEHABIT_ITEM_WIDTH', { path: this.path, index: this.index, fieldIndex: column.index, fieldWidth: newWidth, modifyTime: commonUtils.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss') })
      }
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleRadioChange(val){
      this.$emit('handleRadioChange', val)
    },
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    }
  }
}
</script>
<style scoped>
.comTableStlye{
  /* margin-left: 10px; */
  background: #fff;
}
.el-pagination{
  text-align: right;
  margin-left: auto;
}

.table-name{
  background: #f5f5f5;
  line-height: 40px;
  padding-left:20px;
  border: 1px solid #EBEEF5;
  border-bottom: 0;
  
}

.table-footer{
  line-height: 28px;
  font-size: 12px;
  margin-left:20px;
  /* text-align: center; */
  padding:4px 0;
  min-height:40px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
</style>
<style>
.table-footer .totalSpan{
  float: left;
  margin: 0 60px 0 0;
  text-align: left;
  word-break: break-all;
}
</style>
