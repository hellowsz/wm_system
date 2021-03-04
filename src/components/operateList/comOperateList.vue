<template>
  <div class="operate-list">
    <template  v-for="(item, i) in operateData" >
      <el-button :key="i" v-if="item.type==='primary'" class="operate-item"  :icon="item.icon" @click="item.fun" type="primary">{{item.label}}</el-button>
      <el-button :key="i" v-else class="operate-item"  :icon="item.icon" @click="item.fun" type="primary" plain>{{item.label}}</el-button>
    </template>
    <slot></slot>
  </div>

</template>
<script>
/**
 * 列表 操作按钮组件
 * 显示效果：提供操作按钮list，渲染显示，并调用各组件
 * type为按钮类型，支持quick-filter/popover-filter/custom-column/print/download，不传入type则视为默认按钮
 * 无回调，操作按钮回调函数随每个按钮传入
 */
export default {
  name: 'comOperateList',
  components: {
  },
  props: {
    /**
     *  { label: '快捷选择', fun: this.changeQuickVisible, type: 'quick-filter', visible: true },
        { label: '筛选', fun: this.changePopoverFilterVisible, type: 'popover-filter', visible: false },
        { label: '字段设置', fun: this.changeCustomVolumnVisible, callback: this.customColumnCallback, type: 'custom-column', visible: false, title: ['隐藏字段', '显示字段'] },
        { label: '批量打印', fun: this.print, type: 'print', visible: true },
        { label: '批量下载', fun: this.download, type: 'download', visible: true },
        { label: '信息', fun: this.download, type: '', icon: 'el-icon-info', visible: true }
     */
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      operateData: this.data
    }
  },
  methods: {
    changeQuickFilterVisible () {
      this.quickFilterVisible = !this.quickFilterVisible
    }
  }
}
</script>
<style scoped>
.operate-list{
  /* margin-left: 10px; */
  background: #fff;
}
.el-button{
  padding: 8px 10px;
  margin-left: 7px;
  font-size: 5px;
}

</style>
