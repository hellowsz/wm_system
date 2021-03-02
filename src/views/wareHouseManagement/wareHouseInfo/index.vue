<template>
  <div class="wareHouseInfo">
    <div class="title">仓储信息</div>
    <div class="content">
      <table-filter  @callback="tableFilterCallback">
      </table-filter>
    </div>
  </div>
</template>

<script>
import tableFilter from "@/components/filter/tableFilter.vue";
export default {
  name: "wareHouseInfo",
  components: {
    tableFilter,
  },
  data() {
    return {
       queryData: [
        { label: "分享模板名称", name: "shareTemplateNo", value: '', type: "select", options: []},
        { label: "分享平台", name: "sharingPlatformType", value: '', type: "select", options: [{ label: "全部", value: "" }, { label: "微信", value: "1" }, { label: "飞书", value: "2" }, { label: "钉钉", value: "3" }, { label: "企业微信", value: "4" }, { label: "短信", value: "5" }]},
      ],
    };
  },
  methods: {
    tableFilterCallback() {},
  },
};
</script>

<style>
.wareHouseInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.title {
  margin: 2px;
  background-color: #ffffff;
  padding: 7px;
}
</style>
