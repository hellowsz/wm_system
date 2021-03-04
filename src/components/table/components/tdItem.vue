<template>

  <el-table-column v-if="data.type==='operate'"  :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" :resizable="resizable"
  :sortable="data.sortable"  :fixed="data.fixed"  :type="data.type" :width="data.fieldWidth || defaultWidth" :index='index'>
    <template slot-scope="scope">
      <template v-for="(operateItem,i) in data.list" >
        <el-button v-show='operateItem.showFun?operateItem.showFun(scope.row,scope.$index):true' :disabled="data.disabled" :key="i" @click="operateItem.fun(scope.row,scope.$index)"  type="text">{{operateItem.label}}</el-button>
      </template>
    </template>
  </el-table-column>
  <el-table-column v-else-if="data.type==='slot'"  :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" :resizable="resizable"
  :sortable="data.sortable"  :fixed="data.fixed"  :type="data.type" :min-width="data.fieldWidth || defaultWidth" :index='index'>
    <template slot-scope="scope">
       <slot :name="data.fieldName" :scope="{row:scope.row,data:data}"></slot>
    </template>
  </el-table-column>
  <el-table-column  v-else-if="data.type==='form'"  :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" :resizable="resizable"
  :sortable="data.sortable"  :fixed="data.fixed"  :type="data.type" :min-width="data.fieldWidth || defaultWidth" :index='index'>
    <template slot-scope="scope">
      <template v-for="(inputItem,i) in data.list">
        <el-select v-if="inputItem.type==='selectFun'" :key="inputItem.name+'-'+index"  @change="inputItem.change" v-model="scope['row'][data.fieldName]"  :placeholder="inputItem.placeholder || defaultPlaceholder">
          <el-option v-for="(opt,j) in inputItem.fun(scope['row'])" :key="j" :label="opt[inputItem.config.labelName]" :value="opt[inputItem.config.valueName]"></el-option>
        </el-select>
        <el-select v-else-if="inputItem.type==='selectData' && inputItem.config" :no-data-text="inputItem.noDataText" @change="inputItem.change(scope['row'])" :key="inputItem.name+'-'+index" v-model="scope['row'][data.fieldName]"  :placeholder="inputItem.placeholder || defaultPlaceholder">
          <el-option v-for="(opt,j) in scope['row'][inputItem['config'].dataColumName]" :key="j" :label="opt[inputItem['config'].labelName]" :value="opt[inputItem['config'].valueName]"></el-option>
        </el-select>
        <el-select v-else-if="inputItem.type==='select'" :key="inputItem.name" v-model="scope['row'][data.fieldName]"  :placeholder="inputItem.placeholder || defaultPlaceholder">
          <el-option v-for="(opt,j) in inputItem.options" :key="j" :value="opt.value"></el-option>
        </el-select>
        <el-input v-else-if="inputItem.blur && inputItem.focus" :key="i"  v-model="scope.row[inputItem.name]"  :placeholder="inputItem.placeholder || defaultPlaceholder"  :type="inputItem.type" @blur="inputItem.blur(scope.row)"  @click.native="inputItem.focus(scope.row)" :readonly="inputItem.readonly || false"></el-input>
        <el-input v-else-if="inputItem.blur && !inputItem.focus" :key="i"  v-model="scope.row[inputItem.name]"  :placeholder="inputItem.placeholder || defaultPlaceholder"  :type="inputItem.type" @blur="inputItem.blur(scope.row)" :readonly="inputItem.readonly || false"></el-input>
        <el-input v-else-if="!inputItem.blur && inputItem.focus" :key="i"  v-model="scope.row[inputItem.name]"  :placeholder="inputItem.placeholder || defaultPlaceholder"  :type="inputItem.type" @click.native="inputItem.focus(scope.row)" :readonly="inputItem.readonly || false"></el-input>
        <el-input v-else :key="i"  v-model="scope.row[inputItem.name]"  :placeholder="inputItem.placeholder || defaultPlaceholder"  :type="inputItem.type" :readonly="inputItem.readonly || false"></el-input>
      </template>
    </template>
  </el-table-column>
  <el-table-column  v-else-if="data.type==='radio'" :align="data.align || 'center'" :fixed="data.fixed" :type="data.type"  :index='index' width="55" >
  <template slot-scope="scope">
    <el-radio name="radio" v-model="data.selectValue" :label="scope.$index" @change="handleRadioChange(scope.row)">&nbsp;</el-radio>
  </template>
  </el-table-column>
  <el-table-column v-else-if="data.type==='link'" @click="data.fun(scope.row,scope.$index)"  :key="data.index || data.fieldName" :label="data.fieldDesc" :prop="data.fieldName"
  :sortable="data.sortable"  :fixed="data.fixed"  :type="data.type" :index='index' :align="data.align || 'left'"
   v-bind="{'width':resizable?data.fieldWidth || defaultWidth:null, 'max-width':resizable?data.fieldWidth || defaultWidth:null, 'min-width':resizable?data.fieldWidth || defaultWidth:null }"
  >
    <template slot-scope="scope">
      <el-button class="linkButton" v-show='data.showFun?data.showFun(scope.row,scope.$index):true' @click="data.fun(scope.row,scope.$index)"  type="text">{{data.disConverFun?data.disConverFun(scope.row[data.fieldName]):(scope.row[data.fieldName]||data.context||'')}}</el-button>
    </template>
  </el-table-column>
  <el-table-column  v-else-if="data.type==='money'" :class-name='data.className || ""'  :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" v-bind:sortable="data.sortable" :align="data.align || 'right'"
  :fixed="data.fixed" :type="data.type"  v-bind="{width:resizable?data.fieldWidth || defaultWidth:null, 'max-width':resizable?data.fieldWidth || defaultWidth:null , 'min-width':resizable?data.fieldWidth || defaultWidth:null}" :formatter="moneyFormatter" :index='index'></el-table-column>
   <el-table-column  v-else-if="data.type==='selection'"  :selectable="data.selectable || null" :align="data.align || 'center'" :fixed="data.fixed" :type="data.type"  width="55" ></el-table-column>
   <el-table-column  v-else-if="data.filters" :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" v-bind:sortable="data.sortable"  :align="data.align"
  v-bind:filters="data.filters" v-bind:filter-method="filterHandler" :fixed="data.fixed" :type="data.type" :min-width="data.fieldWidth || defaultWidth" :index='index'>
    <template slot-scope="scope">
      <div  class='ellipsis' :title='scope.row[data.fieldName]'>{{scope.row[data.fieldName]}}</div>
    </template>
  </el-table-column>
  
  <el-table-column v-else :key="data.fieldName" :label="data.fieldDesc" :prop="data.fieldName" v-bind:sortable="data.sortable"  :align="data.align || 'left'"
  :fixed="data.fixed" :type="data.type"  v-bind="{width:resizable?data.fieldWidth || defaultWidth:null, 'max-width':resizable?data.fieldWidth || defaultWidth:null, 'min-width':resizable?data.fieldWidth || defaultWidth:data.fieldWidth }" :formatter="data.formatter" :index='index'>
    <template slot-scope="scope">
      <div class='ellipsis' v-bind:class='data.className && data.classFieldName && data.className[scope.row[data.classFieldName]] || ""' :title='scope.row[data.fieldName]'>{{data.disConverObj?data.disConverObj[scope.row[data.fieldName]]:data.disConverFun?data.disConverFun(scope.row[data.fieldName]):scope.row[data.fieldName]}}</div>
    </template>
  </el-table-column>
</template>
<script>
/**
 * 筛选输入框
 */
export default {
  name: 'tdItem',
  components: {
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    index: Number,
    isNeedSetMinWidth: Boolean,
    resizable: {
      type: Boolean,
      default () {
        return true
      }
    },
    
  },
  data () {
    return {
      defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultPlaceholder: '',
      defaultWidth: '120'
    }
  },
  mounted () {
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    moneyFormatter (row, column) {
      let val = row[column.property]
      if (!isNaN(val)) {
        return '￥'+(+val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      } else {
        return ''
      }
    },
    changeClassName (row) {
      return this.data.classFun(row)
    },
    handleRadioChange (row) {
      this.$emit('handleRadioChange', row)
    }
  }
}
</script>
<style scoped>
.linkButton{
  font-size: 12px;
}
</style>
