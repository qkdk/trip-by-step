<template>
  <div style="height: 90vh; border-right: 1px solid gainsboro">
    <div style="height: 40vh; border-bottom: 1px solid gainsboro">
      <div style="font-size: xx-large; height: 30%">
        <div v-if="planInfo">
          {{ planInfo.planTitle }}
        </div>
        <div v-else>
          {{ userId }}
          <br />
          님의 계획
        </div>
      </div>
      <div style="height: 50%; align-items: center; padding-top: 2vh">
        <div style="height: 50%">
          <div>시작 날짜</div>
          <div style="padding-left: 1vw; padding-right: 1vw">
            <b-form-datepicker v-model="startDate" class="mb-2"></b-form-datepicker>
          </div>
        </div>
        <div style="height: 50%">
          <div>도착 날짜</div>
          <div style="padding-left: 1vw; padding-right: 1vw">
            <b-form-datepicker v-model="endDate" class="mb-2"></b-form-datepicker>
          </div>
        </div>
      </div>
      <div class="button-container">
        <plan-write-modal @button-click-event="(subject) => submitPlan(subject)"></plan-write-modal>
      </div>
    </div>
    <div class="scroll-container">
      <plan-attraction-list
        :attractions="selectedAttractions"
        @place-click="(attraction) => deleteAttraction(attraction)"
      ></plan-attraction-list>
    </div>
  </div>
</template>

<script>
import PlanAttractionList from "@/components/plan/PlanAttractionList";
import PlanWriteModal from "@/components/plan/write/PlanWriteModal";
import { axiosBuilderWithJwt } from "@/api/http";

export default {
  name: "PlanWriteDetail",
  components: { PlanWriteModal, PlanAttractionList },
  props: ["planInfo"],
  data() {
    return {
      userId: "",
      startDate: "",
      endDate: "",
      subject: "",
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
  },
  computed: {
    selectedAttractions() {
      return this.$store.getters.getSelectedAttractions;
    },
    selectedAttractionsSet() {
      return this.$store.getters.getSelectedAttractionsSet;
    },
  },
  methods: {
    deleteAttraction(attraction) {
      this.$store.commit("setSelectedAttractionsSet", attraction);
    },
    submitPlan(subject) {
      this.subject = subject;
      axiosBuilderWithJwt()
        .post(`plan/write`, this.makePlanWriteRequestDto())
        .then(({ data }) => {
          alert(data.msg);
          this.$router.push({ name: "plan" });
        })
        .catch(({ response }) => alert(response.data));
    },
    makeContentIdList() {
      const contentIdList = [];
      this.selectedAttractions.forEach((attraction) => contentIdList.push(attraction.contentId));
      return contentIdList;
    },
    makePlanWriteRequestDto() {
      return {
        startDate: this.startDate,
        endDate: this.endDate,
        planTitle: this.subject,
        contentIdList: this.makeContentIdList(),
      };
    },
  },
};
</script>

<style scoped>
.scroll-container {
  overflow-y: auto;
  max-height: 50vh;
  padding-left: 1vw;
  padding-right: 1vw;
}

.button-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 20%;
  padding-left: 1vw;
  padding-right: 1vw;
}
</style>
