<template>
  <div>
    <button class="submit-button" @click="openModal">계획 만들기</button>
    <transition name="modal-fade">
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <h2>계획을 만드시겠습니까?</h2>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 10vh;
            "
          >
            <div>계획 제목</div>
            <input v-model="titleSubject" />
          </div>
          <div style="margin-top: 5vh; display: flex; justify-content: end">
            <button class="submit-button" @click="buttonClickListener">
              계획 만들기
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'PlanWriteModal',
  data() {
    return {
      isModalOpen: false,
      titleSubject: '',
    };
  },
  methods: {
    ...mapMutations(['changeSelectedAttractions']),
    ...mapMutations(['setSelectedAttractionsSet']),
    ...mapMutations(['setSearchAttractions']),
    openModal() {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // 화면 스크롤 방지
      document.addEventListener('click', this.outsideClickHandler);
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto'; // 화면 스크롤 재활성화
      document.removeEventListener('click', this.outsideClickHandler);
    },
    outsideClickHandler(event) {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    },
    buttonClickListener() {
      this.$emit('button-click-event', this.titleSubject);
      this.closeModal();
      this.changeSelectedAttractions(null);
      this.setSelectedAttractionsSet(null);
      this.setSearchAttractions(null);
    },
  },
};
</script>

<style scoped>
.submit-button {
  border: none;
  background-color: #a7dbe1;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  padding: 10px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active {
  opacity: 0;
}

.modal-fade-enter-to {
  opacity: 1;
}

.modal-fade-leave-active {
  opacity: 1;
}

.modal-fade-leave-to {
  opacity: 0;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 30vw;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}
</style>
