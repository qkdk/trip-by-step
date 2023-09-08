<template>
  <div class="comment-container">
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.replyNo" class="comment">
        <div class="comment-content">
          <p class="comment-content-text">{{ comment.replyContent }}</p>
          <div class="comment-info">
            <p>{{ comment.replyUserId }}&nbsp;-&nbsp;</p>
            <p class="comment-time">{{ comment.replyCreateTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-input">
      <input v-model="reply.replyContent" placeholder="댓글을 입력하세요" required />
      <button class="comment-button" @click="submitComment">
        <font-awesome-icon :icon="['fas', 'pencil-alt']" />
      </button>
    </div>
  </div>
</template>

<script>
import { axiosBuilderWithJwt } from "@/api/http";
import { mapState } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

library.add(faPencilAlt);

const trailStore = "trailStore";
export default {
  name: "TrailBoardReply",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      name: "",
      reply: {
        boardNo: 0,
        replyUserId: sessionStorage.getItem("userId"),
        replyContent: "",
        replyCreateTime: "",
      },
      comments: [],
      joinmembers: [],
    };
  },
  computed: {
    ...mapState(trailStore, ["board"]),
    ...mapState(trailStore, ["members"]),
  },
  methods: {
    submitComment() {
      // console.log(this.reply.replyUserId + " asdasdasdasd" + this.members.trail_party_member_id);

      this.joinmembers = [];
      for (let i = 0; i < this.members.length; i++) {
        this.joinmembers.push(this.members[i].trail_party_member_id);
      }

      if (this.joinmembers.includes(this.reply.replyUserId)) {
        console.log(this.reply);
        axiosBuilderWithJwt().post(`/trail/board/reply/write`, this.reply);
        this.reply.replyCreateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(this.reply.replyContent + "    댓글입력한 값입니다.");
        this.comments.push({
          replyUserId: this.reply.replyUserId,
          replyContent: this.reply.replyContent,
          replyCreateTime: this.reply.replyCreateTime,
        });
        this.reply.replyContent = "";
        this.replyCreateTime = "";
      } else {
        alert("계획에 참여하는 사람만 댓글 작성이 가능합니다.");
      }
    },
    fetchComments() {
      setTimeout(() => {
        axiosBuilderWithJwt()
          .get(`/trail/board/reply/${this.board.trail_board_no}`)
          .then(({ data }) => {
            this.comments = data;
            console.log(this.comments[0] + "       댓글입니다.");
          })
          .catch(() => {
            alert("다시 클릭해주세요");
          });
      }, 1000);
    },
  },
  mounted() {
    // 컴포넌트가 마운트된 후 서버에서 댓글 목록을 가져옵니다.

    this.fetchComments();
    this.reply.boardNo = this.board.trail_board_no;
  },
};
</script>

<style scoped>
.comment-input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.comment-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
}

.comment-input .comment-button {
  padding: 10px;
  background-color: transparent;
  border: none;
  color: #444444;
  font-size: 16px;
  cursor: pointer;
}

.comment-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}


.comment-form input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 16px;
  margin-bottom: 10px;
}

.comment-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.comment {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-content-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.comment-info {
  display: flex;
  align-items: center;
}

.comment-time {
  font-size: 12px;
  color: #888;
}

.comment-info p {
  font-size: 12px;
  color: #888;
}

.comment-info button {
  background-color: transparent;
  border: none;
  color: #007bff;
  font-size: 12px;
  cursor: pointer;
}
</style>
