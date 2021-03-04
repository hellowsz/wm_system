<template>
  <el-date-picker
    v-if="data.type === 'date' || data.type === 'datetime'"
    :clearable="!data.hideClear"
    v-model="data.value"
    :value-format="data.format || defaultDateFormat"
    :type="data.type"
    :placeholder="data.placeholder || defaultPlaceholder"
  ></el-date-picker>
  <div v-else-if="data.type === 'daterange'">
    <el-date-picker
      v-model="data.value"
      :clearable="!data.hideClear"
      :value-format="data.format || defaultDateFormat"
      type="daterange"
      range-separator="-"
      :start-placeholder="data.startPlaceholder || defaultStartPlaceholder"
      :end-placeholder="data.endPlaceholder || defaultEndPlaceholder"
    ></el-date-picker>
  </div>
  <el-date-picker
    v-else-if="data.type === 'month'"
    @change="valChange"
    v-model="data.value"
    :clearable="!data.hideClear"
    :type="data.type"
    :placeholder="data.placeholder"
    value-format="yyyy-MM"
  />
  <div v-else-if="data.type === 'datetimerange'">
    <el-date-picker
      v-model="data.value"
      :clearable="!data.hideClear"
      :type="data.type"
      :placeholder="data.placeholder"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-time="['00:00:00', '23:59:59']"
    />
  </div>
  <el-select
    v-else-if="data.type === 'select'"
    @change="valChange"
    v-model="data.value"
    :placeholder="data.placeholder || defaultPlaceholder"
  >
    <el-option
      v-for="(opt, i) in data.options"
      :key="i"
      :label="opt.label"
      :value="opt.value"
    ></el-option>
  </el-select>
  <div v-else-if="data.type === 'select-input'">
    <el-select
      :class="{ 'filter-item-select': data.value[0] == 99 }"
      v-model="data.value[0]"
      :placeholder="data.placeholder || defaultPlaceholder"
    >
      <el-option
        v-for="(opt, i) in data.options"
        :key="i"
        :label="opt.label"
        :value="opt.value"
      ></el-option>
    </el-select>
    <el-input
      v-show="data.value[0] == 99"
      :placeholder="data.placeholder || defaultPlaceholder"
      clearable
      :class="{ 'filter-item-input': data.value[0] == 99 }"
      v-model="data.value[1]"
    ></el-input>
  </div>
  <div v-else-if="data.type === 'numberrange'">
    <el-input
      type="number"
      class="numberrange-input"
      :placeholder="data.placeholder || defaultPlaceholder"
      v-model="data.value[0]"
    ></el-input>
    <span class="numberrange-line">-</span>
    <el-input
      type="number"
      class="numberrange-input"
      :placeholder="data.placeholder || defaultPlaceholder"
      v-model="data.value[1]"
    ></el-input>
  </div>
  <el-input v-else-if="data.type==='department'"  :id='data.name' v-model="showValue" readonly="readonly"  :placeholder="data.placeholder || defaultPlaceholder" ></el-input>
  <div class="valueRange el-input" v-else-if="data.type==='valueRange'">
    <input v-model="data.value[0]" type="text" />至
    <input v-model="data.value[1]"  type="text"/>
  </div>
  <el-autocomplete
    v-else-if="data.type==='autocomplete'"
    class="inline-input"
    v-model="data.value"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    @select="handleSelect"
  ></el-autocomplete>
   <el-input v-else-if="data.type === 'number'" v-model="data.value" type="number" :placeholder="data.placeholder || defaultPlaceholder" clearable></el-input>
  <el-input v-else v-model="data.value" :disabled="data.disabled"  :placeholder="data.placeholder || defaultPlaceholder" clearable></el-input>
</template>
<script>
export default {
  name: 'filterItem',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
      return {
          defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultPlaceholder: '',
      defaultStartPlaceholder: '',
      defaultEndPlaceholder: '',
      defaultMaxLength: 10,
      defaultBusiType: 0,
      showValue: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      }
  },
  created () {
    if (this.data.valueInfo) {
      this.data.config.selData = this.data.valueInfo
    }
    
  },
  computed: {

  },
  methods: {
    init () {

    },
    valChange(){
      if(this.data.type === 'month'){
        this.data.relaName && this.$emit('change', this.data)
      } else if(this.data.type === 'select'){
        this.data.relaName && this.$emit('change', this.data)
      }
    },
    changeQuickFilterVisible () {
      this.quickFilterVisible = !this.quickFilterVisible
    },
    clearValue () {
      if (this.$refs[this.data.name]) {
        this.$refs[this.data.name].clearValue()
      } else {
        this.showValue = ''
        this.data.value = ''
        this.data.valueInfo = null
      }
    },
    querySearch (queryString, cb) {
      if (typeof this.data.querySearch !== 'undefined') {
        this.$bus.$emit(this.data.querySearch, queryString, cb)
      }
    },
    handleSelect (item) {
      if (typeof this.data.handleSelect !== 'undefined') {
        this.$bus.$emit(this.data.handleSelect, item)
      }
    }
  },
//   destroyed () {
//     $('#' + this.data.name).die('click')
//   },
  watch: {
    // data: {
    //   handler (newValue, oldValue) {
    //     this.init(newValue)
    //   },
    //   deep: true
    // }
  }
}
</script>
<style lang='scss' >
  .valueRange{
    input{
      height: 32px;
      line-height: 32px;
      outline: 0;
      padding: 0 15px;
      background-image: none;
      border-radius: 4px;
      background-color: #FFF;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      width: 45%;
      
    }
  }
.filter-table .query-table-div .numberrange-input{
    width: 47%;
  }
  .filter-table .query-table-div .numberrange-input input{
    padding: 0;
    padding-left: 10px;
  }
  .filter-table .query-table-div .numberrange-line{
    width: 6%;
    display: inline-block;
    text-align: center;
  }
 .filter-table .query-table-div .el-input.filter-item-input{
    width: 60%;
  }
  .filter-table .query-table-div .el-select.filter-item-select{
    width: 35%;
    margin-right: 5%;
  }
</style>

