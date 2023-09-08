<template>
  <div>
    <div class="control-container">
      <div style="flex: 1">
        <button v-if="isMyPlan" class="toggle-button" @click="changePlanList">인기 계획 보기</button>
        <button v-else class="toggle-button" @click="changePlanList">내 계획 보기</button>
      </div>
      <div style="flex: 1; display: flex; justify-content: space-between">
        <div class="centered-item">
          검색 조건
        </div>
        <div class="centered-item">
          <select v-model="key">
            <option value="plan_title">계획 이름</option>
            <option value="user_id">작성자</option>
          </select>
        </div>
      </div>
      <div style="flex: 1; display: flex; justify-content: space-between">
        <input v-model="searchWord" placeholder="여행지 검색" style="width: calc(100% - 5vh)"/>
        <button @click="getListByKeyAndWord" style="border: 0; background-color: rgba(0, 0, 0, 0)">
          <img
              style="height: 3vh"
              src="https://github.com/qkdk/enjoy-trip/assets/86948395/a60c5653-f4bf-41c5-ae4b-7a95cdd33afe"
          />
        </button>
      </div>
    </div>
    <div class="scroll-container">
      <div
          v-for="plan in planList"
          :key="plan.planId"
          class="plan-container"
          @click="planClickListener(plan.planId)"
      >
        <div class="title-container">
          {{ plan.planTitle }}
          <button v-if="validateUserId(plan.userId)" @click="modifyClickListener(plan.planId)"
                  style="background-color: white; border: 0; padding: 0">
            <img src="https://github.com/qkdk/enjoy-trip/assets/86948395/79a2989a-91b1-4bfd-b3c4-bf64813adb2b"
                 style="height:3vh">
          </button>
        </div>
        <div class="description-container">
          <div class="user-info">만든이: {{ plan.userId }}</div>
          <div class="recommend-count">
            <heart-button :is-clickable="isClickable(plan.planId)"
                          @heart-button-click="(isClicked) => recommendClickListener(plan.planId, isClicked)"></heart-button>
            {{ plan.recommendCount }}
          </div>
        </div>
      </div>
    </div>
    <div
        style="
        height: 10vh;
        padding: 1vh;
        border-top: 1px solid gainsboro;
        display: flex;
        justify-content: center;
        flex-direction: column;
      "
    >
      <button v-if="isMyPlan" class="submit-button" @click="deletePlan">계획 삭제하기</button>
      <button v-else class="submit-button" @click="copyPlan">내 계획으로 가져오기</button>
    </div>
  </div>
</template>

<script>
// 데이터를 받아오고
// vuex에 적용
// routing
import {axiosBuilderWithJwt} from "@/api/http";
import HeartButton from "@/components/HeartButton";

export default {
  name: "HotPlanList",
  components: {HeartButton},
  data() {
    return {
      pgno: 1,
      planList: [],
      isMyPlan: false,
      searchWord: "",
      key: "plan_title",
      selectedPlanId: "",
      recommendList: [],
      currentMethod: this.getHotPlanList,
    };
  },
  created() {
    this.getHotPlanList();
    this.getRecommendList();
  },
  methods: {
    modifyClickListener(planId) {
      this.getPlanDetailByPlanId(planId)
          .then(({data}) => this.$store.commit("setSelectedAttractionSetAll", data.data.attractionList))
          .then(() => this.$router.push({name: "planwrite", props: this.$store.getters.getPlanInfo}));
    },
    validateUserId(userId) {
      return sessionStorage.getItem("userId") === userId;
    },
    recommendClickListener(planId, isClicked) {
      const value = isClicked ? 1 : -1
      axiosBuilderWithJwt()
          .put(`plan/${planId}?value=${value}`)
          .then(() => this.currentMethod())
          .catch(({response}) => alert(response.data));
    },
    isClickable(planId) {
      for (const recommendedPlanId of this.recommendList) {
        if (planId == recommendedPlanId) {
          return false;
        }
      }
      return true;
    },
    getRecommendList() {
      axiosBuilderWithJwt()
          .get("plan/recommend")
          .then(({data}) => this.recommendList = data.data)
          .catch(({response}) => alert(response.data));
    },
    copyPlan() {
      if (this.selectedPlanId.length === 0) {
        alert("계획을 선택해주세요");
      } else {
        axiosBuilderWithJwt()
            .get(`plan/copy/${this.selectedPlanId}`)
            .then(({data}) => alert(data.msg))
            .catch(({response}) => alert(response.data));
      }
    },
    deletePlan() {
      axiosBuilderWithJwt()
          .delete(`plan/${this.selectedPlanId}`)
          .then(({data}) => alert(data.msg))
          .catch(({response}) => alert(response.data));
    },
    getListByKeyAndWord() {
      this.currentMethod = this.getListByKeyAndWord;
      axiosBuilderWithJwt()
          .get(`plan/view?pgno=${this.pgno}&key=${this.key}&word=${this.searchWord}`)
          .then(({data}) => (this.planList = data.data))
          .catch(({response}) => alert(response.data));
    },
    getHotPlanList() {
      this.currentMethod = this.getHotPlanList;
      axiosBuilderWithJwt()
          .get(`plan/view?pgno=${this.pgno}&order=recommend_count`)
          .then(({data}) => (this.planList = data.data))
          .catch(({response}) => alert(response.data));
    },
    getMyPlanList() {
      this.currentMethod = this.getMyPlanList;
      axiosBuilderWithJwt()
          .get(`plan/view/user`)
          .then(({data}) => (this.planList = data.data))
          .catch(({response}) => alert(response.data));
    },
    planClickListener(planId) {
      this.selectedPlanId = planId;
      this.getPlanDetailByPlanId(planId)
          .then(({data}) => this.setSelectedPlanState(data.data))
    },
    async getPlanDetailByPlanId(planId) {
      return await axiosBuilderWithJwt()
          .get(`plan/${planId}`)
          .catch(({response}) => alert(response.data));
    },
    setSelectedPlanState(data) {
      this.$store.commit("setPlanInfo", data.planInfo);
      this.$store.commit("setPlanAttracions", data.attractionList);
    },
    changePlanList() {
      if (this.isMyPlan) {
        this.getHotPlanList();
        this.isMyPlan = !this.isMyPlan;
      } else {
        this.getMyPlanList();
        this.isMyPlan = !this.isMyPlan;
      }
    },
  }
}
</script>

<style scoped>
.toggle-button {
  border: none;
  background-color: #a7dbe1;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  padding: 10px;
}

.control-container {
  display: flex;
  flex-direction: column;
  padding: 1vh;
  height: 25vh;
  border-bottom: 1px solid gainsboro;
}

.submit-button {
  border: none;
  background-color: lightcoral;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  padding: 10px;
}

.scroll-container {
  overflow-y: auto;
  height: 55vh;
  padding-left: 1vw;
  padding-right: 1vh;
}

.plan-container {
  display: flex;
  flex-direction: column;
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

.plan-container:hover {
  transform: scale(1.05);
}

.description-container {
  display: flex;
  flex: 1;
  color: darkgray;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.title-container {
  font-weight: bold;
  font-size: x-large;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.user-info {
  font-size: large;
  color: gray;
  margin-top: auto;
  margin-bottom: 0;
}

.recommend-count {
  font-size: large;
  color: gray;
  margin-top: auto;
  margin-bottom: 0;
}

.centered-item {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}
</style>
