<template>
  <div style="height: 90vh; border-left: 1px solid gainsboro">
    <div
      style="
        display: flex;
        flex-direction: column;
        padding: 1vh;
        height: 30vh;
        border-bottom: 1px solid gainsboro;
      "
    >
      <div style="flex: 1; display: flex">
        <select-sido @select-sido="selectSido" style="width: 100%"></select-sido>
      </div>
      <div style="flex: 1">
        <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>
      </div>
      <div style="flex: 1">
        <select-content-type @select-content-type="selectContentType"></select-content-type>
      </div>
      <div style="flex: 1; display: flex; justify-content: space-between; padding-bottom: 1vh">
        <input v-model="searchWord" placeholder="여행지 검색" style="width: calc(100% - 5vh)" />
        <button @click="getAttractions" style="border: 0; background-color: rgba(0, 0, 0, 0)">
          <img
            style="height: 4vh"
            src="https://github.com/qkdk/enjoy-trip/assets/86948395/a60c5653-f4bf-41c5-ae4b-7a95cdd33afe"
          />
        </button>
      </div>
    </div>
    <div class="scroll-container">
      <plan-search-list
        :attractions="attractions"
        @place-click="(attraction) => addAttraction(attraction)"
      >
      </plan-search-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import SelectSido from "@/components/item/SelectSido.vue";
import SelectGugun from "@/components/item/SelectGugun.vue";
import { axiosBuilderWithJwt } from "@/api/http";
import SelectContentType from "@/components/item/SelectContentType";
// import PlanAttractionList from '@/components/plan/PlanAttractionList';
import PlanSearchList from "@/components/plan/PlanSearchList.vue";

const itemStore = "itemStore";
export default {
  name: "PlanWriteAttractions",
  components: {
    // PlanAttractionList,
    SelectContentType,
    SelectSido,
    SelectGugun,
    PlanSearchList,
  },
  data() {
    return {
      message: "",
      sidoCode: 0,
      gugunCode: 0,
      contentTypeId: 0,
      attractions: [],
      searchWord: "",
    };
  },
  methods: {
    addAttraction(attraction) {
      this.$store.commit("setSelectedAttractionsSet", attraction);
    },
    ...mapActions(itemStore, ["getGugun"]),
    ...mapMutations(itemStore, ["CLEAR_GUGUN_LIST"]),
    selectSido(sidoCode) {
      this.sidoCode = sidoCode;
      console.log(sidoCode);
      console.log(this.sidoCode);
      this.getAttractions();
    },
    selectGugun(gugunCode) {
      this.gugunCode = gugunCode;
      console.log(this.gugunCode);
      console.log(gugunCode);
      this.getAttractions();
    },
    selectContentType(contentTypeId) {
      this.contentTypeId = contentTypeId;
      this.getAttractions();
    },
    getAttractions() {
      axiosBuilderWithJwt()
        .get(
          `attraction/${this.sidoCode}/${this.gugunCode}/${this.contentTypeId}?word=${this.searchWord}`
        )
        .then(({ data }) => {
          this.attractions = data.data;
          this.$store.commit("setSearchAttractions", data.data);
        });
    },
  },
};
</script>

<style scoped>
.scroll-container {
  overflow-y: auto;
  max-height: 60vh;
  padding-left: 1vw;
  padding-right: 1vw;
}
</style>
