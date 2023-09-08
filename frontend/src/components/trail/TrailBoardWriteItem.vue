<template>
  <div class="post-container" v-if="board == null">
    <div class="post-detail-container">
      <input type="text" v-model="title" placeholder="제목" class="input-field"/>
      <textarea v-model="content" placeholder="내용" rows="8" class="textarea-field"></textarea>
      <div class="date-picker">
        <label for="start-date" style="width: auto; margin: 0; margin-right: 1vw">시작일:</label>
        <input type="date" id="start-date" v-model="startDate" class="date-input" style="flex: 1"/>
      </div>
      <div class="date-picker">
        <label for="end-date" style="width: auto; margin: 0; margin-right: 1vw">종료일:</label>
        <input type="date" id="end-date" v-model="endDate" class="date-input" style="flex: 1"/>
      </div>
      <vue-slider v-model="numPeople" :min="1" :max="10" class="slider"></vue-slider>
      <div class="slider-text">몇 명에서 가고 싶은가요? {{ numPeople }}명</div>
    </div>
    <div class="button-container">
      <button class="custom-button" @click="write">작성</button>
    </div>
  </div>

  <div class="post-modify" v-else>
    <h1>같이 둘레길 갈 사람을 구해보세요</h1>
    <input type="text" v-model="board.trail_board_title" placeholder="제목" class="input-field"/>
    <textarea
        v-model="board.trail_board_content"
        placeholder="내용"
        rows="8"
        class="textarea-field"
    ></textarea>
    <div class="date-picker">
      <label for="start-date">시작일:</label>
      <input
          type="date"
          id="start-date"
          v-model="board.trail_board_start_time"
          class="date-input"
      />
    </div>
    <div class="date-picker">
      <label for="end-date">종료일:</label>
      <input type="date" id="end-date" v-model="board.trail_board_end_time" class="date-input"/>
    </div>
    <vue-slider
        v-model="board.trail_board_member_count"
        :min="1"
        :max="10"
        class="slider"
    ></vue-slider>
    <div class="slider-text">몇 명에서 가고 싶은가요? {{ members.length }}명</div>
    <button class="submit-button" @click="modify">수정</button>
  </div>
</template>

<script>
import {axiosBuilderWithJwt} from "@/api/http";
import {mapActions, mapMutations, mapState} from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

const trailStore = "trailStore";

export default {
  name: "TrailBoardWriteItem",
  components: {
    VueSlider,
  },
  data() {
    return {
      message: "",
      title: "",
      content: "",
      startDate: null,
      endDate: null,
      initPeople: 1,
      numPeople: 1,
    };
  },
  computed: {
    ...mapState(trailStore, ["trail"]),
    ...mapState(trailStore, ["isWritePage"]),
    ...mapState(trailStore, ["board"]),
    ...mapState(trailStore, ["members"]),
  },
  created() {
    // console.log(this.trail.trail_id);
  },
  methods: {
    ...mapMutations("trailStore", ["CLEAR_BOARD_LIST"]),
    ...mapMutations("trailStore", ["CHANGE_WRITE_PAGE"]),
    ...mapActions(trailStore, ["setBoardLatest"]),
    ...mapActions(trailStore, ["setBoard"]),
    write() {
      console.log(this.trail.title);
      if (this.title == "") {
        alert("제목을 입력하세요");
      } else if (this.content == "") {
        alert("본문을 입력하세요");
      } else if (this.startDate == null) {
        alert("시작일을 선택하세요");
      } else if (this.endDate == null) {
        alert("종료일을 선택하세요");
      } else {
        let loginUser = sessionStorage.getItem("userId");
        setTimeout(async () => {
          await axiosBuilderWithJwt().post(`/trail/write`, {
            trail_board_trail_id: this.trail.trail_id,
            user_id: loginUser,
            trail_board_title: this.title,
            trail_board_content: this.content,
            trail_board_start_time: this.startDate,
            trail_board_end_time: this.endDate,
            trail_board_member_count: this.initPeople,
            trail_board_max_member: this.numPeople,
            trail_party_member_id: loginUser,
          });
          this.CLEAR_BOARD_LIST();
          await this.setBoardLatest();
          // this.CHANGE_WRITE_PAGE();
        }, 300);
        setTimeout(() => {
          this.$router.push("/trailboardview");
        }, 600);
      }
    },
    modify() {
      console.log(this.board);
      if (this.board.trail_board_title == "") {
        alert("제목을 입력하세요");
      } else if (this.board.trail_board_content == "") {
        alert("본문을 입력하세요");
      } else if (this.board.trail_board_start_time == null) {
        alert("시작일을 선택하세요");
      } else if (this.board.trail_board_end_time == null) {
        alert("종료일을 선택하세요");
      } else {
        setTimeout(async () => {
          await axiosBuilderWithJwt().put(`/trail/board/modify`, this.board);
          console.log(this.board);
          await this.setBoard(this.board);
          this.$router.push("/trailboardview");
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.custom-button {
  width: 50%;
  height: 50%;
  border: none;
  border-radius: 5px;
  background-color: #a7dbe1;
}

.button-container {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-detail-container {
  width: 100%;
  height: 70vh;
}

.post-container {
  height: 100%;
  width: 100%;
}

h1 {
  margin-bottom: 30px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.textarea-field {
  resize: vertical; /* 세로 크기 조절 가능 */
}

.submit-button {
  background-color: #57abe2;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #b1c8d6;
}

.slider {
  margin-bottom: 20px;
}

.slider .vue-slider-dot,
.slider .vue-slider-handle {
  width: 20px;
  height: 20px;
  background-color: #45acbe;
  border: 2px solid #4393b3;
  border-radius: 50%;
  transition: background-color 0.2s, border-color 0.2s;
}

.slider .vue-slider-handle:hover,
.slider .vue-slider-handle:focus {
  background-color: #3ebaeb;
  border-color: #24a9dd;
}

.slider .vue-slider-dot {
  margin-top: -9px;
}

.slider .vue-slider-dot:hover,
.slider .vue-slider-dot:focus {
  background-color: #376bdb;
}

.slider-text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  color: #555;
}

.date-picker {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.date-picker label {
  margin-right: 10px;
}

.date-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.post-modify {
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
