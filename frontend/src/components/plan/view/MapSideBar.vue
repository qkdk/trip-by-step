<template>
  <div style="height: 5vh">
    <div class="button-container">
      <button v-b-toggle.sidebar-right class="toggle-button">상세검색</button>
    </div>
    <b-sidebar id="sidebar-right" right shadow>
      <div class="px-3 py-2">
        <div class="title-container">상세 검색</div>
        <div>인기 여행지</div>
        <div>나의 계획</div>
        <div>이름 검색</div>
        <div>유저 아이디 검색</div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
// import SelectSido from "@/components/item/SelectSido.vue";
// import SelectGugun from "@/components/item/SelectGugun.vue";

const itemStore = "itemStore";
const trailStore = "trailStore";


export default {
  name: "MapSideBar",
  components: {
    // SelectSido,
    // SelectGugun,
  },
  data() {
    return {
      message: "",
      sidoCode: null,
    };
  },
  methods: {
    ...mapActions(trailStore, ["getTrailList"]),
    ...mapActions(itemStore, ["getGugun"]),
    ...mapMutations(itemStore, ["CLEAR_GUGUN_LIST"]),
    selectSido(sidoCode) {
      this.sidoCode = sidoCode;
    },
    selectGugun(gugunCode) {
      console.log(`시도=${this.sidoCode}:::구군=${gugunCode}`);
      console.log(gugunCode);
      if (gugunCode)
        this.getTrailList({
          sido: this.sidoCode,
          gugun: gugunCode,
        });
    },
  },
}
</script>

<style scoped>
/*.title-container {*/
/*  display: flex;*/
/*  font-size: xxx-large;*/
/*  justify-content: start;*/
/*  align-items: center;*/
/*}*/

/*.button-container {*/
/*  border-radius: 5px;*/
/*  width: calc(100% - 30px);*/
/*  position: absolute;*/
/*  margin-top: 10px;*/
/*  margin-bottom: 10px;*/
/*  bottom: 0;*/
/*}*/

/*.toggle-button {*/
/*  border: none;*/
/*  background-color: #a7dbe1;*/
/*  border-radius: 5px;*/
/*  width: 100%;*/
/*  outline: none;*/
/*  color: white;*/
/*  padding: 10px;*/
/*}*/
</style>