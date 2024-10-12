<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { getFileThumb, isVideo, isImage } from "Utils/files";
import { WGS84ToGCJ02 } from "Utils/coordinateCover";

import { ImagePreview ,Overlay } from 'vant';
window.map = null;
export default {
  data() {
    return {
      data: [],
      total: 0,

      // position: 0,
      // images: [],
      // show: false,
      // videoSrc:'',
    };
  },
  methods: {
    isVideo: isVideo,
    isImage: isImage,
    openImg(list,index){
      if(isVideo(list[index])) {
        this.show = true;
        this.videoSrc = list[index];
      } else {
        ImagePreview({
          images: [
              ...list
          ],
          startPosition: index,
        });
      }
      // this.images = [...list];
      // this.show = true;
      // this.position = index;

    },
    addNew() {
      this.$router.push("record-add");
    },
    async loadData() {
        // {
        //         "id": "79020d90-83bd-11ef-9a0e-558754ec48dd",
        //         "title": "天下第一桥",
        //         "createTime": "2024-10-06 16:32:07",
        //         "message": "",
        //         "coordinate": [
        //             24.712420024523055,
        //             118.4548880313243
        //         ],
        //         "address": "福建省泉州市晋江市报恩路",
        //         "source": "geolocation",
        //         "paths": [
        //             "https://ppandzy.com/files/2024106/b235ad48-2cbe-4544-8500-ca76dea69983.mov"
        //         ]
        //     },
      const data = await this.$api["main/memory/list"]();
      this.data = data.data.map((item) => {
        item.paths = item?.paths?.map(item=>{
          return item.replace('https://ppandzy.com','').replace('https://www.ppandzy.com','')
        }) ?? []
        if (item?.coordinate && item?.coordinate?.length) {
          item.coordinateGCJ = WGS84ToGCJ02(item?.coordinate.reverse()).reverse();
        } else {
          item.coordinateGCJ = [39.984104, 116.307503];
        }
        item.pathsThumb =
          (item.paths &&
            item.paths.length &&
            item.paths.map((img) => {
              return getFileThumb(img);
            })) ||
          [];
        return item;
      });
      this.total = data.total || this.data.length;

      this.data.forEach((item,index)=>{
        this.showOneInfoWindow(item,index);
      })
      const markerArr = this.data?.map(item=>item.coordinateGCJ);
      this.showBound(markerArr)
    },
    showOneInfoWindow (data,index){
      const imgIndex = data?.paths.findIndex(item=>{
        return isImage(item);
      })
      var infoWindow = new TMap.InfoWindow({
          map: window.map,
          position: new TMap.LatLng(...data.coordinateGCJ),
          zIndex:index,
          content: `
          <div>
            ${imgIndex > -1 ?`<img src='${data.pathsThumb?.[imgIndex]}'>`:""}
            <p style="margin:5px 0;font-size:15px">${data.title}</p>
            <p style="margin:5px 0;font-size:13px; color:#888">${data.address}</p>
          </div>`
      });
    },
    showBound(markerArr){
      var bounds = new TMap.LatLngBounds();
      //设置自适应显示marker
      //判断标注点是否在范围内
      markerArr.forEach(function(item){
          //若坐标点不在范围内，扩大bounds范围
          if(bounds.isEmpty() || !bounds.contains(item)){
              bounds.extend(item);
          }
      })
      //设置地图可视范围
      window.map.fitBounds(bounds, {
          padding: 100 // 自适应边距
      });
},  
    showMarker(markerArr) {
      
    }

  },
  beforeCreate() {},
  created() {
    this.loadData();
  },
  mounted() {
    var center = new TMap.LatLng(39.984104, 116.307503);
    //初始化地图
    window.map = new TMap.Map("map", {
        pitch:60, //设置俯仰角度（0~45）
        zoom:12,//设置地图缩放级别
        center: center//设置地图中心点坐标
    });
  },
};
</script>
<style scoped lang="stylus">
#map{
  width:100%;
  height:100vh;
}
.memory-total {
  color: #5d5d5d;
}

.memory-total-number {
  color: #42b983;
}

.main-list {
  padding: 5px;
}

.memory-item {
  padding: 10px 15px;
  border-bottom: 1px solid #c7c7c7;
}

.memory-title {
  color: #8BC34A;
}

.memory-coordinate {
  font-size: 12px;
  color: #999;
}

.memory-address {
  font-size: 13px;
  color: #888;
}

.memory-message {
  padding-top: 10px;
}

.memory-imgs {
  margin: 0 -10px;
  padding: 5px;
  font-size: 0;
  display: flex;
}

.memory-imgs .img-content {
  width: 25%;
  margin: 5px;
  position: relative;
}

.memory-imgs .img-content:after {
  display: block;
  padding-top: 100%;
  content: '';
}
.memory-imgs .img-content .img-content_video::after{
 display: block;
    content: 'video';
    font-size: 12px;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0px 0px 2px #000;
    color: #fff;
}
.memory-imgs .img-content img,
.memory-imgs .img-content video,

 {
  width: 100%;
  position: absolute;
  height: 100%;
  object-fit: cover;
}
</style>
