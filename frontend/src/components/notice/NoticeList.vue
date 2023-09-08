<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()" v-if="user === 'admin'"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          id="my-table"
          striped
          hover
          :items="articles"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          @row-clicked="viewArticle"
        >
        </b-table>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
import { axiosBuilderWithJwt } from "@/api/http";
export default {
  name: "NoticeList",
  components: {},
  data() {
    return {
      articles: [],
      fields: [
        { key: "noticeNo", label: "글번호", tdClass: "tdClass" },
        { key: "noticeTitle", label: "제목", tdClass: "tdSubject" },
        { key: "userId", label: "작성자", tdClass: "tdClass" },
        { key: "noticeCreateTime", label: "작성일", tdClass: "tdClass" },
        { key: "noticeHit", label: "조회수", tdClass: "tdClass" },
      ],
      perPage: 10,
      currentPage: 1,
      user: sessionStorage.getItem("userId"),
    };
  },
  created() {
    axiosBuilderWithJwt()
      .get(`/notice/api?key=&word=`)
      .then(({ data }) => {
        this.articles = data;
        console.log(data);
      });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "noticewrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "noticeview",
        params: { articleno: article.noticeNo },
      });
    },
  },
  computed: {
    rows() {
      return this.articles.length;
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
