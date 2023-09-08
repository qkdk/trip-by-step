<template>
  <div class="search-component-container">
    <div class="search-component-element" style="padding-right: 0.5vw">
      <select-sido @select-sido="selectSido"></select-sido>
    </div>
    <div class="search-component-element" style="padding-left: 0.5vw">
      <select-gugun :sidoCode="sidoCode" @select-gugun="selectGugun"></select-gugun>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
import SelectSido from '@/components/item/SelectSido.vue';
import SelectGugun from '@/components/item/SelectGugun.vue';

const itemStore = 'itemStore';
const trailStore = 'trailStore';

export default {
  name: 'TrailSearch',
  components: {
    SelectSido,
    SelectGugun,
  },
  data() {
    return {
      message: '',
      sidoCode: null,
    };
  },
  created() {
  },
  methods: {
    ...mapActions(trailStore, ['getTrailList']),
    ...mapActions(itemStore, ['getGugun']),
    ...mapMutations(itemStore, ['CLEAR_GUGUN_LIST']),
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
};
</script>

<style scoped>
.search-component-container {
  display: flex;
}

.search-component-element {
  flex: 1;
}
</style>
