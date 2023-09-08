<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <!-- <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="article.userId"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group> -->

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="article.noticeTitle"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.noticeContent"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { axiosBuilderWithJwt } from '@/api/http';

export default {
  name: 'BoardInputItem',
  data() {
    return {
      article: {
        noticeNo: 0,
        userId: '',
        noticeTitle: '',
        noticeContent: '',
      },
      isUserid: false,
      no: '',
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === 'modify') {
      this.no = this.$route.params.articleno;
      axiosBuilderWithJwt()
        .get(`/notice/api/${this.no}?noticeNo=${this.no}`)
        .then(({ data }) => {
          // this.article.articleno = data.article.articleno;
          // this.article.userid = data.article.userid;
          // this.article.subject = data.article.subject;
          // this.article.content = data.article.content;
          this.article = data;
        });
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = '';
      // !this.article.userId &&
      //   ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      // err &&
      !this.article.noticeTitle &&
        ((msg = '제목 입력해주세요'),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.noticeContent &&
        ((msg = '내용 입력해주세요'),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === 'register' ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.noticeNo = 0;
      this.article.noticeTitle = '';
      this.article.noticeContent = '';
      this.moveList();
    },
    registArticle() {
      axiosBuilderWithJwt()
        .post(`/notice/api/write`, {
          userId: sessionStorage.getItem('userId'),
          noticeTitle: this.article.noticeTitle,
          noticeContent: this.article.noticeContent,
        })
        .then(({ data }) => {
          let msg = '등록 처리시 문제가 발생했습니다.';
          if (data === '글쓰기 완료') {
            msg = '등록이 완료되었습니다.';
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      axiosBuilderWithJwt()
        .put(`/notice/api/modify`, {
          noticeNo: this.article.noticeNo,
          userId: sessionStorage.getItem('userId'),
          noticeTitle: this.article.noticeTitle,
          noticeContent: this.article.noticeContent,
        })
        .then(({ data }) => {
          console.log(data.msg);
          let msg = '수정 처리시 문제가 발생했습니다.';
          if (data.msg === '수정 성공') {
            msg = '수정이 완료되었습니다.';
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        });
    },
    moveList() {
      this.$router.push({ name: 'noticelist' });
    },
  },
};
</script>

<style></style>
