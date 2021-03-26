<template>
  <el-container direction="vertical" class="content">
    <div class="wareHouseReport">
      <location-table
      @markLocation="markLocation"
      > 
      </location-table>
      <baidu-map
        class="bm-view"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :scroll-wheel-zoom="true"
      >
        <!-- 百度地图城市列表 -->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <!-- 比例尺 -->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <div><bm-marker
          :position="pointLocation.position"
          animation="BMAP_ANIMATION_BOUNCE"
        >
          <bm-label
            :content="pointLocation.wareHouseName"
            :labelStyle="{ color: 'red', fontSize: '24px' }"
            :offset="{ width: -35, height: 30 }"
          />
        </bm-marker></div>
      </baidu-map>
    </div>
  </el-container>
</template>
<script>
import locationTable from "@/components/table/locationTable.vue";
export default {
  name: "wareHouseReport",
  components: {
    locationTable,
  },
  data() {
    return {
      pointLocation:{
        wareHouseID:"",
        wareHouseName:"",
        position:{lat:"",lng:""}
      },
      center: {
        lng: 0,
        lat: 0,
      },
      zoom: 3,
    };
  },
  methods: {
    handler({ Bmap, map }) {
      console.log(Bmap, map);
      this.center = "chengdu";
      this.zoom = 15;
    },
    markLocation(val){
      console.log(val)
      this.pointLocation = val

    }
  },
};
</script>

<style>
.bm-view {
  margin-left: 10px;
  width: 100%;
  height: 100%;
}
.wareHouseReport {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
