<template>
  <div style="background-color: #42b983">
    <div id="map" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "TrailMap",
  data() {
    return {
      map: null,
      mapContainer: null,
      markers: [],
      positions: [],
      mapOption: {},
      curValue: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      this.initScript();
    }
    this.trailLocationChangeListener(this.trailLocation);
  },
  computed: {
    trailLocation() {
      return this.$store.getters["trailStore/GET_TRAIL_LOCATION"];
    }
  },
  watch: {
    trailLocation: {
      handler(newValue) {
        this.trailLocationChangeListener(newValue);
      },
      deep: true,
    }
  },
  methods: {
    // 맵 설정
    trailLocationChangeListener(newValue) {
      const mappedValue = [
        {
          latitude: newValue.startY,
          longitude: newValue.startX
        },
        {
          latitude: newValue.endY,
          longitude: newValue.endX
        }
      ];

      this.curValue = newValue;
      if (mappedValue.length !== 0) {
        this.initMap(mappedValue[0].latitude, mappedValue[0].longitude, this.map.getLevel());
        this.mapContainer = document.getElementById("map"); // 지도를 표시할 div
        this.positions = [];
        this.createPositions(mappedValue);
        // this.makeLine(mappedValue);
        this.showMark(this.positions);
      }
    },

    makeLine(newValue) {
      if (newValue.length !== 0) {
        let linePath = [];
        newValue.forEach((place) =>
            linePath.push(new window.kakao.maps.LatLng(place.latitude, place.longitude))
        );

        let polyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 4, // 선의 두께 입니다
          strokeColor: "#0f4773", // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });
        polyline.setMap(this.map);
      }
    },
    createPositions(newValue) {
      newValue.forEach((attraction, index) =>
          this.positions.push(this.makeMark(attraction, index)));
    },

    initScript() {
      const script = document.createElement("script");
      script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=b7c6907abe12849970bf0d5a19f6717e&autoload=false";
      script.onload = () => window.kakao.maps.load(this.initMap);
      document.head.appendChild(script);
    },

    initMap(lat = 33.450701, lng = 126.570667, level = 8) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: level,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.mapContainer = document.getElementById("map");
    },

    makeMark(element, index) {
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(24, 24), // 마커이미지의 크기입니다
          imageOption = {}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      if (index === 0) {
        imageSrc =
            "https://github.com/qkdk/enjoy-trip/assets/86948395/aac0a8a9-ee1f-4ca9-a5a9-e2e4feedbcbc";
      } else {
        // 종료 이미지
        imageSrc =
            "https://github.com/kindfamily/f-instagram/assets/86948395/a34c7b4f-8905-4df6-a430-6494ac1937c6"
      }
      const coordX = element.latitude;
      const coordY = element.longitude;
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다

      const target = index === 0 ? "출발지" : "도착지";
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new window.kakao.maps.LatLng(coordX, coordY), // 마커가 표시될 위치입니다
          content = `<div style="  display: flex;
                 flex-direction: row;
                 align-items: flex-start;
                 margin-top: 5px;
                 margin-bottom: 5px;
                 border-radius: 5px;
                 padding: 10px;
                 background-color: white;
                 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                 transition: transform 0.2s;
               ">
                 <div style="
                   display: flex;
                   flex-direction: column;
                   flex: 1;
                   width: 100%;
                   justify-content: space-between;
                   align-items: flex-start;
                 ">
                   <div style="  flex: 1;
                     font-weight: bold;
                     font-size: larger;
                     display: -webkit-box;
                     -webkit-line-clamp: 1;
                     -webkit-box-orient: vertical;
                     overflow: hidden;
                     text-overflow: ellipsis;">
                     ${target}
                   </div>
                 </div>
               </div>`;
      return {markerPosition, markerImage, content};
    },
    showMark(positions) {
      for (let i = 0; i < positions.length; i++) {
        const marker = new window.kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].markerPosition, // 마커의 위치
          image: positions[i].markerImage,
        });

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: positions[i].markerPosition,
          content: positions[i].content, // 인포윈도우에 표시할 내용
          xAnchor: 0.5,
          yAnchor: 1.2,
        });

        window.kakao.maps.event.addListener(
            marker,
            "mouseover",
            this.makeOverListener(customOverlay, this.map)
        );
        window.kakao.maps.event.addListener(
            marker,
            "mouseout",
            this.makeOutListener(customOverlay)
        );
      }
    },
    makeOverListener(overlay, map) {
      return function () {
        overlay.setMap(map);
      };
    },
    makeOutListener(overlay) {
      return function () {
        overlay.setMap(null);
      };
    },
  },
};
</script>

<style scoped>
</style>
