<template>
  <div>
    <b-row style="margin: 0">
      <b-col cols="3"></b-col>
      <b-col
        cols="6"
        style="padding-top: 10vh; padding-bottom: 0; padding-left: 2vw; padding-right: 2vw"
      >
        <div class="post-details">
          <h2 class="post-title">{{ article.noticeTitle }}</h2>
          <div class="post-content-wrapper">
            <div class="post-content">
              <p class="post-info">작성자: {{ article.userId }}</p>
              <p class="post-info">글번호: {{ article.noticeNo }}</p>
              <p class="post-info">작성일: {{ article.noticeCreateTime }}</p>
            </div>
          </div>
          <div class="post-content-wrapper">
            <div class="post-content">{{ message }}</div>
          </div>
          <div class="button-group">
            <span v-if="loninUser == article.userId">
              <button class="btn btn-custom btn-edit" @click="moveModifyArticle">수정</button>
              <button class="btn btn-custom btn-delete" @click="deleteArticle">삭제</button>
            </span>
            <button class="btn btn-custom btn-mvlist" @click="moveList">목록</button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { axiosBuilderWithJwt } from "@/api/http";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      no: "",
      loninUser: sessionStorage.getItem("userId"),
    };
  },
  computed: {
    message() {
      if (this.article.noticeContent) return this.article.noticeContent.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    console.log(this.$route.params.articleno);
    this.no = this.$route.params.articleno;
    axiosBuilderWithJwt()
      .get(`/notice/api/${this.no}?noticeNo=${this.no}`)
      .then(({ data }) => {
        this.article = data;
      });
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "noticemodify",
        params: { articleno: this.article.noticeNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "noticedelete",
          params: { articleno: this.article.noticeNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "noticelist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped>
.post-details {
  padding: 1vw;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(129, 129, 129, 0.3);
}

.post-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.post-content-wrapper {
  max-height: 300px; /* 스크롤 최대 높이 */
  overflow-y: auto; /* 세로 스크롤 적용 */
}

.post-content {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  padding-top: 10px;
  margin-top: 10px;
}

.post-content p {
  margin-bottom: 10px;
}

.post-content a {
  color: #367ad3;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-content a:hover {
  color: #2b5ea4;
}

.post-content img {
  max-width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.btn-custom {
  background-color: transparent;
  border: 2px solid #727272;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1%;
}

/* .btn-join {
  color: #f9ca32;
}

.btn-edit {
  color: #3ac569;
}

.btn-delete {
  color: #e53935;
}

.btn-mvlist {
  color: plum;
} */

.btn-custom:hover {
  background-color: #a7d8f5;
}

.btn-custom:hover .btn-join {
  color: #fff;
}

.button-group {
  text-align: right;
}

.custom-button {
  width: 50%;
  height: 50%;
  border: none;
  border-radius: 5px;
  background-color: #a7dbe1;
}

.custom-button:hover {
  background-color: #81c5fd;
}

.trail-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  padding: 5vh;
}

.button-container {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
