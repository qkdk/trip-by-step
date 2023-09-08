<template>
  <div>
    <b-row style="margin: 0; min-height: 75vh">
      <b-col cols="6" style="border-right: 1px solid gainsboro; padding: 1vw">
        <h1 style="height: 10vh">둘레길을 찾아보세요</h1>
        <trail-search></trail-search>
        <div style="padding-top: 3vh">
          <trail-list></trail-list>
        </div>
      </b-col>
      <b-col cols="6" style=" padding: 1vw">
        <h1 style="height: 10vh">둘레길 게시판</h1>
        <trail-board-list></trail-board-list>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TrailSearch from "@/components/trail/TrailSearch.vue";
import TrailList from "@/components/trail/TrailList.vue";
import TrailBoardList from "@/components/trail/TrailBoardList.vue";

import {mapMutations} from "vuex";

export default {
  name: "AppTrail",
  components: {
    TrailSearch,
    TrailList,
    TrailBoardList,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  created() {
    this.SET_ISWRITE_TRUE();
  },
  methods: {
    ...mapMutations("trailStore", ["SET_ISWRITE_TRUE"]),
  },
};
</script>

<style scoped>
</style>
