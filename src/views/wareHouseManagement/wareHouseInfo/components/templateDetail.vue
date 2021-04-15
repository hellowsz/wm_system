<template>
  <div class="drawer-content adSpaceManagement">
    <el-form
      label-position="left"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="150px"
    >
      <el-row v-if="editable">
        <el-button type="primary" size="medium" @click="submit">保存</el-button>
        <el-button @click="toCancel">取消</el-button>
      </el-row>
      <el-row v-else>
        <el-button type="primary" size="medium" @click="editDetail"
          >修改</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="Enable(1)"
          v-if="+data.state === 0"
          >启用</el-button
        >
        <el-button
          type="primary"
          size="medium"
          @click="Enable(0)"
          v-if="+data.state === 1"
          >禁用</el-button
        >
        <el-button  size="medium" @click="toDelete"
          >删除</el-button
        >

      </el-row>

      <el-row v-if="editable">
        <div>
          <div class="info-title">
            <span class="title">基本信息</span>
            <hr />
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="广告位名称" prop="advertSpaceName">
                  <el-input
                    v-model="form.advertSpaceName"
                    class="advertSpaceName"
                    @input="advertSpaceNameChange"
                    :disabled="adSpaceNameDisabled"
                    placeholder="请输入广告位名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="广告位编号" prop="advertSpaceNo">
                  <el-input
                    v-model="form.advertSpaceNo"
                    class="advertSpaceNo"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="图片尺寸" prop="pictureSize">
                  <div class="pictureSize">
                    <el-select v-model="form.pictureSize" placeholder="请选择">
                      <el-option
                        v-for="(item, index) in imgSize"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        placeholder="请选择图片尺寸"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="广告位状态" prop="state">
                  <el-radio v-model="form.state" label="1" border
                    >启用</el-radio
                  >
                  <el-radio v-model="form.state" label="0" border
                    >禁用</el-radio
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="显示广告数量" prop="advertSpaceNo">
                  <el-input
                    v-model="form.advertCount"
                    class="advertSpaceNo"
                    placeholder="请输入显示广告数量"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="info-title">
            <span class="title" style="border-left : 3px solid #ffffff">标签项设置</span>
            <hr />
          </div>
          <div>
            <el-row>
              <el-col
                :span="12"
                v-for="(item, index) in form.label"
                :key="index + 1"
              >
                <el-form-item :label="`标签项${index + 1}`" prop="label">
                  <div class="labelAll">
                    <el-input
                      v-model="form.label[index].value"
                      class="label"
                      placeholder="请输入标签项名称"
                    ></el-input>
                    <el-button
                    v-if=" form.label.length !== 1"
                      @click="deleteLabel(index + 1)"
                      class="deleteLabel"
                      type="text"
                      icon="el-icon-remove-outline"
                      circle
                    ></el-button>
                    <el-button
                      v-if="index + 1 === form.label.length"
                      class="addLabel"
                      type="text"
                      @click="addLabel(index + 1)"
                      icon="el-icon-circle-plus-outline"
                      circle
                    ></el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-row>

      <el-tabs
        style="margin-top: 24px"
        v-model="activeName"
        @tab-click="handleClick"
        v-else
      >
        <el-tab-pane label="配置详情" name="basic">
          <div>
            <div class="info-title">
              <span class="title">基本信息</span>
              <hr />
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="广告位名称">
                    {{ data.advertSpaceName }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="广告位编号">
                    {{ data.advertSpaceNo }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="图片尺寸">
                    {{ data.pictureSize }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="广告位状态">
                    {{ data.stateName }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="显示广告数量">
                    {{ data.advertCount }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="info-title">
              <span class="title" style="border-left : 3px solid #ffffff">标签项设置</span
              ><span style="color: #909399"
                  >--------------------------------------------------------------------------------------------------------</span
                >
              <a @click="isShowLabel">查看标签项设置<i v-if="isShowLabelFlag" class="el-icon-arrow-up"></i><i class="el-icon-arrow-down" v-else></i></a>
            </div>
            <div>
              <el-row v-if="isShowLabelFlag">
                <el-col
                  :span="12"
                  v-for="(item, index) in data.label"
                  :key="index"
                >
                  <el-form-item
                    :label="'标签项' + (index + 1)"
                    prop="templateName"
                  >
                    {{ item.value }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="修改人">
                  {{ data.modifyStaff }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="修改时间">
                  {{ data.modifyTime }}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      isShowLabelFlag: false,
      userInfoBo: {},
      userInfo: {},
      adSpaceNameDisabled: false,
      companydefaultinfo: ["", ""],
      tmcdefaultinfo: ["", ""],
      companyInfo: {
        companyID: "",
        companyName: "",
        tmcNumber: "",
        disabled: true
      },
      tmcInfo: {
        companyID: "",
        companyName: "",
        tmcNumber: "",
        disabled: true
      },
      activeName: "basic",
      imgSize: [
        {
          value: "740*450",
          label: "740*450"
        },
        {
          value: "750*380",
          label: "750*380"
        },
        {
          value: "750*400",
          label: "750*400"
        },

        {
          value: "750*1023",
          label: "750*1023"
        },
        {
          value: "750*1030",
          label: "750*1030"
        },
        {
          value: "800*600",
          label: "800*600"
        },
        {
          value: "900*600",
          label: "900*600"
        },
        {
          value: "1920*460",
          label: "1920*460"
        },


      ],
      rules: {
        advertSpaceName: [
          { required: true, message: "请输入广告位名称", trigger: "change" }
        ],
        advertSpaceNo: [
          { required: true, message: "请输入广告位编号", trigger: "change" }
        ],
        state: [
          { required: true, message: "请选择广告位状态", trigger: "change" }
        ]
      },
      form: {
        advertSpaceName: "",
        advertSpaceNo: "",
        advertCount: "",
        pictureSize: "",
        state: "1",
        label: [{}],
        isInsert: 0
      }
    };
  },
  computed: {
    
  },
  props: ["visible", "data", "editable", "template"],
  created() {
    let $this = this;
  },
  methods: {
    
  }
};
</script>

<style scoped lang="scss">
.margin-right {
  margin-right: 18px;
}
.sharePlatLogo {
  width: 18px;
}
.drawer-content {
  padding-left: 20px;
}
/* .drawer-content .el-tabs {
  margin: 20px 0 0;
} */
.info-title {
  margin-bottom: 12px;
}
.diy textarea {
  height: 200px;
}
.scroll {
}
.script {
  background-color: #f5f7fe;
  height: 204px;
  margin-right: 40px;
  padding: 4px 8px;
  overflow: auto;
}
.suitTypeSelect,
.tmcName,
.companyName,
.advertSpaceName,
.pictureSize,
.templateTypeId,
.advertSpaceNo,
.label {
  width: 210px;
}
// .diy .el-input,
// .diy textarea {
//   width: 300px;
// }
.drawer-content .el-menu--horizontal > .el-menu-item.is-active {
  background-color: #fff;
}
// .form-diy-xts label, .form-diy-xts div{
//   line-height: 1 !important;
// }
// .form-diy-xts .el-form-item{
//   margin-bottom: 24px;
// }
.linkButton {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss">
.shareTypeTable .el-form-item__content {
  margin: 0 !important;
}
.shareTypeTable .el-table .el-table__empty-text {
  left: auto;
  margin-left: auto;
}
.addLabel {
  color: #409eff;
  font-size: 22px !important;
  height: 22px;
  width: 22px;
  align-self: start;
}
.deleteLabel {
  color: #f31e1f;
  font-size: 22px !important;
  height: 22px;
  width: 22px;
  align-self: start;
}
.labelAll{
  display: flex;
  align-items: center;
}
.adSpaceManagement{
  .el-form-item__label{
    position: relative;
  }
  .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    position: absolute;
    left: -10px;
  }
  .el-form-item__label{
    position: relative;
    left: 10px;
    color: #909399;
  }
  .el-form-item__content{
  color: #606266;
}
.el-button{
  font-size: 14px;
}
.el-button--default{
  color: #999999;
}
}

</style>
