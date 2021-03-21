<template>
  <el-container direction="vertical" class="content">
    <div class="title">仓储信息</div>
      <table-filter
        :data="queryData"
        @callback="tableFilterCallback"
        btnName="查询"
      >
      </table-filter>
      <com-operate-list :data="operateData"></com-operate-list>
      <com-table
      ref="table"
      @pageChange="pageChange"
      style="width: 100%;"
      :index="tableConfig.index"
      :header="tableHeader"
      :showHeader="tableShowHeader"
      :data="tableData"
      :tableOperate="tableOperate"
      :pageSize="tableConfig.pageSize"
      :currentPage="tableConfig.pageIndex"
      :loading="loading"
    ></com-table>
  </el-container>
</template>

<script>
import tableFilter from "@/components/filter/tableFilter.vue";
import comOperateList from "@/components/operateList/comOperateList.vue";
import comTable from "@/components/table/comTable.vue";
import { query} from '@/api/warehouseInfo'
export default {
  name: "wareHouseInfo",
  components: {
    tableFilter,
    comOperateList,
    comTable,
  },
  data() {
    return {
      loading: false,
      //筛选查询条件
      queryData: [
        {
          label: "适用类型",
          name: "suitType",
          value: "",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { label: "默认", value: 2 },
            { label: "TMC", value: 1 },
            { label: "企业", value: 0 },
          ],
          relaName: "tmcid",
        },
        {
          label: "模板名称",
          name: "templateName",
          value: "",
          type: "text",
        },
        {
          label: "模板类型",
          name: "templateTypeId",
          value: "",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { value: 0, label: "APP超标详情" },
            { value: 1, label: "超标审批列表" },
            { value: 2, label: "超标审批详情" },
          ],
        },
        {
          label: "业务类型",
          name: "businessTypeID",
          value: "",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { label: "机票", value: 0 },
            { label: "酒店", value: 1 },
            { label: "火车票", value: 2 },
            { label: "用车", value: 3 },
            { label: "国际机票", value: 7 },
            { label: "改签机票", value: 8 },
            { label: "其他", value: 99 },
          ],
        },
        {
          label: "状态",
          name: "isDisabled",
          value: "",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { label: "启用", value: 0 },
            { label: "禁用", value: 1 },
          ],
        },
      ],
      //展示表格
      tableConfig: {
        getFieldFromPage: 1,
        index: 1, // 用户习惯的模块id，默认为1
        // 表头字段
        fieldList: [
          {
            fieldName: "advertSpaceName",
            fieldDesc: "广告位名称",
            align: "left",
            fieldWidth: 200,
            fieldStatus: "2"
          },
          {
            fieldName: "advertSpaceNo",
            fieldDesc: "广告位编号",
            align: "left",
            fieldWidth: 160,
            fieldStatus: "2"
          },
          {
            fieldName: "pictureSize",
            fieldDesc: "图片尺寸",
            align: "center",
            fieldWidth: 160,
            fieldStatus: "2"
          },
          {
            fieldName: "advertCount",
            fieldDesc: "显示广告数量",
            align: "right",
            fieldWidth: 140,
            fieldStatus: "2"
          },
          {
            fieldName: "labelShow",
            fieldDesc: "标签项",
            align: "center",
            fieldWidth: 200,
            fieldStatus: "2"
          },
          {
            fieldName: "stateName",
            fieldDesc: "状态",
            align: "center",
            fieldWidth: 140,
            fieldStatus: "2"
          },
          {
            fieldName: "modifyStaff",
            fieldDesc: "修改人",
            align: "center",
            fieldWidth: 140,
            fieldStatus: "2"
          },
          {
            fieldName: "modifyTime",
            fieldDesc: "修改时间",
            align: "center",
            fieldWidth: 200,
            fieldStatus: "2"
          }
        ],
        tableFieldConfig: {
          advertSpaceName: { type: "link", fun: this.showDetailInfo },
          isEnable: { disConverObj: { 0: "禁用", 1: "启用" } }
        },
        pageSize: 50,
        pageIndex: 1
      },
      //新增
      operateData: [
        {
          label: "新增",
          fun: this.addNew,
          icon: "el-icon-plus",
          type: "primary",
          visible: true,
          data:"",
          selData:"",
        },
      ],
      //表格多选
      tableOperate: [
        {
          fieldName: "1",
          fieldDesc: "选择",
          type: "selection",
          fixed: "left",
          align: "center",
          fieldStatus: 3
        }
      ],

      tableHeader: [],
      tableShowHeader: [],
      tableData: {},
      pageSelData: [],
      editableMain: true,
      drawerVisible: false,
      drawerTitle: "",
      drawerInfo: {}
    };
  },
  created(){
    let $this = this;
          // 在此处执行你要执行的函数 
      $this.tableHeader = $this.tableConfig.fieldList;;
      let showTableHeader = [];
      $this.tableConfig.fieldList.forEach(item =>{
        showTableHeader.push(item.fieldName)
      })
      $this.tableShowHeader = showTableHeader;
      $this.queryDataList();
  },
  methods: {
    tableFilterCallback(param) {
      // 更新查询条件
      this.queryData = param;
      // 重置列表数据
      this.tableConfig.pageIndex = 1;
      this.tableData.dataInfo = [];
      this.tableData.totalCount = 0;
      // this.queryDataList();
      // 若字段未加载，重新加载
      this.queryDataList();
    },
    getAllFilter() {
      var queryParam = {};
      this.queryData.forEach(item => {
        queryParam[item.name] = item.value;
      });
      for (let key in queryParam) {
        if (queryParam[key] === "" || queryParam[key] === null) {
          delete queryParam[key];
        }
      }
      return queryParam;
    },
    pageChange(pageInfo) {
      this.tableConfig.pageSize = pageInfo.pageSize;
      this.tableConfig.pageIndex = pageInfo.currentPage;
      this.queryDataList();
    },
    queryDataList() {
      let $this = this;
      // this.loading = true;
      let param = {};
      param = this.getAllFilter();
      param.pageSize = this.tableConfig.pageSize;
      param.pageIndex = this.tableConfig.pageIndex;
      query(param).then(res=>{
        console.log(res)
      })
      let data = {
              dataInfo: [
                {
                  advertSpaceName:"123"
                }
              ],
              totalCount: 1
            };
            this.tableData = data;
            this.loading = false;
            console.log(this.tableData)
    },
    addNew() {
      this.drawerVisible = true;
      this.editableMain = true;
      this.drawerInfo = {};
      this.drawerTitle = "新增-广告位管理";
    },
  },
};
</script>

<style>

.title {
  margin: 2px;
  background-color: #ffffff;
  padding: 7px;
}
</style>
