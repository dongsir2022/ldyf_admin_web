<template>
  <baidu-map class="bm-view" center="太原" :zoom="zoom">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" />
    <bm-point-collection :points="mapData" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_BIG" />
  </baidu-map>
</template>

<script>
export default {
  name: 'Richtext',
  props: {
    mapData: {
      default: () => { return [] },
      type: Array
    }
  },
  data() {
    return {
      // center: { lng: 112.55, lat: 37.87 },
      zoom: 8,
      mini: [{ lng: 112.53, lat: 37.87 }, { lng: 112.65, lat: 38.05 }]
    }
  },
  methods: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
