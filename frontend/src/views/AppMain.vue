<template>
  <div>
    <div class="floating-div">
      <h1 class="fade-in" style="color: dodgerblue">Trip By Step</h1>
      <h3 class="fade-in" style="color: dodgerblue">marcher dans le monde</h3>
    </div>
    <main-carousel style="height: 90vh"></main-carousel>
    <div style="height: 85vh; padding-top: 2vh; padding-left: 10vw; padding-right: 10vw">
      <h1>인기 여행지</h1>
      <div style="display: flex; padding: 10px">
        <main-card
            v-for="item in placeData1"
            :key="item.placeNo"
            :image-url="mkUrl(item.placeImgSrc)"
            :title="item.placeTitle"
            style="flex: 1; margin-left: 10px; margin-right: 10px"
        >
        </main-card>
      </div>
      <div style="display: flex; padding: 10px">
        <main-card
            v-for="item in placeData2"
            :key="item.placeNo"
            :image-url="mkUrl(item.placeImgSrc)"
            :title="item.placeTitle"
            style="flex: 1; margin-left: 10px; margin-right: 10px"
        >
        </main-card>
      </div>
    </div>
  </div>
</template>

<script>
import MainCarousel from "@/components/main/MainCarousel";
import MainCard from "@/components/main/MainCard";
import {axiosBuilderWithJwt, baseURL} from "@/api/http";

export default {
  name: "AppMain",
  components: {MainCard, MainCarousel},
  data() {
    return {
      message: "",
      placeData1: [],
      placeData2: [],
    };
  },
  created() {
    axiosBuilderWithJwt()
        .get(`place/api/sort?pgno=1&key=&word=`)
        .then(({data}) => {
          for (let i = 0; i < 4; i++) {
            this.placeData1.push(data.data[i]);
          }
          for (let i = 4; i < 8; i++) {
            this.placeData2.push(data.data[i]);
          }
        });
  },
  methods: {
    mkUrl(url) {
      return baseURL + url;
    },
  },
};
</script>

<style scoped>
.floating-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  padding-bottom: 10vh;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* 다른 스타일 및 크기 설정 */
}

.fade-in {
  opacity: 0; /* 처음에 투명하게 설정 */
  animation: fade-in 3s forwards; /* fade-in 애니메이션 적용 */
}

@keyframes fade-in {
  from {
    opacity: 0; /* 시작 상태 */
  }
  to {
    opacity: 1; /* 최종 상태 */
  }
}
</style>
