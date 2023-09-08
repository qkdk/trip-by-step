<template>
  <div>
    <div class="table-wrapper" style="text-align: center">
      <table class="custom-table">
        <thead>
          <tr>
            <th>둘레길</th>
            <th>루트</th>
            <th>예상시간</th>
            <th>총 길이</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trail, index) in slicedBoards"
            :key="index"
            @click="openModal(trail)"
          >
            <td>{{ trail.title }}</td>
            <td>{{ trail.route }}</td>
            <td>{{ trail.estimated_time }}</td>
            <td>{{ trail.total_length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="goToPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: currentPage === pageNumber }"
        >
          <a class="page-link" href="#" @click="goToPage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="goToPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="modal" v-if="showModal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <div class="button-wrapper"></div>
        <!-- 모달 내용 -->
        <div class="box">
          <h2>{{ post.title }}</h2>
          <p>{{ post.description }}</p>
          <div>예상 소요시간 : {{ post.estimated_time }}</div>
          <div>시작 지점 : {{ post.start_name }}</div>
          <div>끝 지점 : {{ post.end_name }}</div>
          <div>총 길이 : {{ post.total_length }}</div>
          <br />
          <div>이동 경로 : {{ post.route }}</div>
        </div>
        <b-row>
          <b-col cols="6">
            <button
              class="modal-close is-large"
              aria-label="close"
              @click="closeModal"
            >
              닫기
            </button>
          </b-col>
          <b-col cols="6">
            <button class="create-plan-button" @click="createPlan">
              계획 생성
            </button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const trailStore = 'trailStore';
export default {
  name: 'TrailList',
  components: {},
  data() {
    return {
      message: '',
      showModal: false,
      post: {
        title: '',
        description: '',
        estimated_time: '',
        start_name: '',
        end_name: '',
        route: '',
        total_length: '',
      },
      pageSize: 5, // 한 페이지에 표시할 항목 수
      currentPage: 1, // 현재 페이지 번호
    };
  },
  computed: {
    ...mapState(trailStore, ['trails']),
    totalPages() {
      return Math.ceil(this.trails.length / this.pageSize); // 전체 페이지 수 계산
    },
    slicedBoards() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.trails.slice(startIndex, endIndex);
    },
  },
  created() {
    this.$store.commit('trailStore/CLEAR_TRAIL_LIST');
  },

  methods: {
    ...mapActions(trailStore, ['setTrail']),
    openModal(item) {
      this.post = {
        trail_id: item.trail_id,
        title: item.title,
        description: item.description,
        estimated_time: item.estimated_time,
        start_name: item.start_name,
        end_name: item.end_name,
        route: item.route,
        total_length: item.total_length,
        start_detail_addr: item.start_detail_addr,
        end_detail_addr: item.end_detail_addr,
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    createPlan() {
      this.setTrail(this.post);
      this.$router.push('/trailwrite');
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  margin: 0 auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.custom-table th {
  background-color: #f7f7f7;
  font-weight: bold;
}

.custom-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  background-color: white;
  max-width: 600px;
  width: 90%;
  border-radius: 8px;
  padding: 20px;
}

.box {
  margin-bottom: 20px;
}

.modal-close {
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #ec4a4a;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #555;
}

.modal-close:focus {
  outline: none;
}

.modal-close:active {
  transform: scale(0.9);
}

/* 텍스트를 강조하기 위해 추가한 스타일 */
.modal-close {
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(45, 158, 228, 0.3);
}

.create-plan-button {
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #367ad3;
  transition: color 0.3s ease;
}

.create-plan-button:hover {
  color: #555;
}

.create-plan-button:focus {
  outline: none; /* 포커스 스타일 제거 */
}

.create-plan-button:active {
  transform: scale(0.9);
}
</style>
