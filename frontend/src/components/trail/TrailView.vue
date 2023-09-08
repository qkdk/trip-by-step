<template>
  <div>
    <div class="post-details">
      <h2>{{ trail.title }}</h2>
      <p>{{ trail.description }}</p>
      <div>예상 소요시간: {{ trail.estimated_time }}</div>
      <div>시작 지점: {{ trail.start_name }}</div>
      <div>끝 지점: {{ trail.end_name }}</div>
      <div>총 길이: {{ trail.total_length }}</div>
      <br />
      <div>이동 경로: {{ trail.route }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const trailStore = 'trailStore';
export default {
  name: 'TrailView',
  components: {},
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState(trailStore, ['trail']),
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.post-details {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  border: 1px solid #eaeaea; /* 외각 선 추가 */
}

.post-info-item strong {
  font-weight: bold;
}
</style>
