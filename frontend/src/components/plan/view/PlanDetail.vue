<template>
  <div style="height: 90vh; border-left: 1px solid gainsboro">
    <div v-if="planAttractions.length !== 0">
      <div>
        <b-button
          v-b-toggle.sidebar-right
          @click="executeMethod"
          style="margin-top: 2%; margin-bottom: 2%"
          >대중교통 경로보기</b-button
        >
        <b-sidebar id="sidebar-right" title="대중교통" right shadow width="600px">
          <div class="px-3 py-2">
            <plan-route
              ref="planRoute"
              style="width: 500px; height: 100%; margin-left: 30px"
            ></plan-route>
          </div>
        </b-sidebar>
      </div>

      <div style="position: relative; height: 70vh; align-items: center">
        <div class="scroll-container">
          <div
            class="place-container"
            v-for="place in planAttractions"
            :key="place.contentId"
            @click="planPlaceClickListener(place)"
          >
            <div class="image-container">
              <img
                :src="place.firstImage"
                onerror="this.src='https://github.com/qkdk/enjoy-trip/assets/86948395/c643b90b-fb65-4678-8dd7-7321cb0fdfaf'"
                class="fixed-image"
              />
            </div>
            <div class="description-container">
              <div class="title-container">
                {{ place.title }}
              </div>
              <div class="addr-container">
                {{ place.addr1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      <div class="button-container" @click="recommendClickListener(planInfo.planId)">-->
      <!--        <button class="rec-button">-->
      <!--          추천-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
    <div v-else style="height: 80vh">
      <div class="centered-text">계획을 선택해주세요</div>
    </div>
  </div>
</template>

<script>
import { axiosBuilderWithJwt } from "@/api/http";
import PlanRoute from "./PlanRoute.vue";

export default {
  name: "PlanDetail",
  components: {
    PlanRoute,
  },
  methods: {
    recommendClickListener(planId) {
      axiosBuilderWithJwt
        .put(`plan/${planId}`)
        .then(() => alert("추천되었습니다"))
        .catch(({ response }) => alert(response.data));
    },
    planPlaceClickListener(place) {
      this.$store.commit("setPlanAttraction", place);
    },
    executeMethod() {
      // PlanRoute 컴포넌트의 특정 메서드를 실행합니다.
      this.$refs.planRoute.setRoute();
    },
  },
  computed: {
    planInfo() {
      return this.$store.getters.getPlanInfo;
    },
    planAttractions() {
      return this.$store.getters.getPlanAttractions;
    },
    planAttraction() {
      return this.$store.getters.getPlanAttraction;
    },
  },
  created() {
    this.$store.commit("setPlanInfo", {});
    this.$store.commit("setPlanAttracions", []);
    this.$store.commit("setPlanAttraction", {});
  },
};
</script>

<style scoped>
.rec-button {
  border: none;
  background-color: #a7dbe1;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  padding: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: calc(100% - 30px);
}

.scroll-container {
  overflow-y: auto;
  height: 90vh;
  padding-left: 1vw;
  padding-right: 1vw;
}

.centered-text {
  padding-top: 40vh;
}

.place-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 10vh;
  border-radius: 5px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.fixed-image {
  width: 100%;
  height: 100%;
}

.image-container {
  height: 100%;
  aspect-ratio: 1/1;
}

.place-container:hover {
  transform: scale(1.05);
}

.description-container {
  padding-left: 1vw;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}

.title-container {
  flex: 1;
  font-weight: bold;
  font-size: larger;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.addr-container {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
