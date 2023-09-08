<template>
  <div>
    <draggable v-model="draggedAttractions" @end="handleDragEnd">
      <div
        class="place-container"
        v-for="place in draggedAttractions"
        :key="place.contentId"
        @click="placeClickListener(place)"
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
    </draggable>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'PlanAttractionList',
  props: ['attractions'],
  data() {
    return {
      draggedAttractions: [],
    };
  },
  components: {
    draggable,
  },
  computed: {
    ...mapState(['selectedAttractions']),
  },
  mounted() {
    this.draggedAttractions = [...this.attractions];
  },
  watch: {
    attractions(newAttractions) {
      this.draggedAttractions = [...newAttractions];
    },
  },
  methods: {
    ...mapMutations(['changeSelectedAttractions']),
    placeClickListener(place) {
      this.$emit('place-click', place);
    },
    handleDragEnd() {
      // 드래그 앤 드롭 종료 시 실행할 로직을 여기에 작성합니다.
      this.changeSelectedAttractions(this.draggedAttractions);
    },
  },
};
</script>

<style scoped>
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
  /*height: 100%;*/
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}

.title-container {
  flex: 1;
  font-weight: bold;
  font-size: larger;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.addr-container {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
