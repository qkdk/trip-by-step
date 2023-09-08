<template>
  <div>
    <b-row>
      <b-col cols="3">
        <div style="display: flex; margin-top: 1vh; margin-left: 1vw">
          <button class="rectangle-shadow" @click="writePost">
            <font-awesome-icon icon="pen" />
            글쓰기
          </button>
        </div>
      </b-col>
      <b-col cols="9">
        <div class="search-bar">
          <button
            v-if="!isSort"
            class="selbtn"
            style="margin-right: 2vw"
            @click="sort"
          >
            좋아요순 정렬
          </button>
          <button v-else class="selbtn" style="margin-right: 2vw" @click="sort">
            최신순 정렬
          </button>
          <div class="select-wrapper">
            <select v-model="key">
              <option value="place_title">제목</option>
              <option value="user_id">작성자</option>
            </select>
            <div class="select-arrow"></div>
          </div>
          <input type="text" v-model="word" placeholder="검색어를 입력하세요" />
          <button
            @click="search"
            style="margin-left: 1vw; background-color: white; border: 0"
          >
            <img
              style="height: 4vh"
              src="https://github.com/qkdk/enjoy-trip/assets/86948395/a60c5653-f4bf-41c5-ae4b-7a95cdd33afe"
            />
          </button>
        </div>
      </b-col>
    </b-row>

    <b-row style="margin-top: 3vh">
      <b-col cols="1"></b-col>
      <b-col
        cols="3"
        class="img-col"
        style="padding-right: 10px; padding-left: 0"
      >
        <div v-for="(place, index) in list1" :key="index" class="image-wrapper">
          <div class="rounded-image">
            <img
              :src="mkUrl(place.placeImgSrc)"
              width="100%"
              height="250px"
              class="image-effect"
              style="object-fit: cover"
              @click="mvView(place.placeImgSrc, place)"
            />
          </div>
          <heart-count :recommend="place.recommend"></heart-count>
        </div>
      </b-col>
      <b-col
        cols="3"
        class="img-col"
        style="padding-right: 10px; padding-left: 0"
      >
        <div v-for="(place, index) in list2" :key="index" class="image-wrapper">
          <div class="rounded-image">
            <img
              :src="mkUrl(place.placeImgSrc)"
              width="100%"
              height="250px"
              class="image-effect"
              style="object-fit: cover"
              @click="mvView(place.placeImgSrc, place)"
            />
          </div>
          <heart-count :recommend="place.recommend"></heart-count>
        </div>
      </b-col>
      <b-col
        cols="3"
        class="img-col"
        style="padding-right: 10px; padding-left: 0"
      >
        <div v-for="(place, index) in list3" :key="index" class="image-wrapper">
          <div class="rounded-image">
            <img
              :src="mkUrl(place.placeImgSrc)"
              width="100%"
              height="250px"
              class="image-effect"
              style="object-fit: cover"
              @click="mvView(place.placeImgSrc, place)"
            />
          </div>
          <heart-count :recommend="place.recommend"></heart-count>
        </div>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <div ref="scrollTrigger"></div>
    <div v-if="isLoading">로딩 중...</div>
    <!-- 모달창 시작 -->
    <b-modal
      id="modal-1"
      size="xl"
      :title="article.placeTitle"
      v-model="isModalOpen"
      class="custom-modal"
      hide-footer
    >
      <b-row>
        <b-col cols="8">
          <img :src="mkUrl(imageUrl)" alt="이미지" width="100%" height="700" />
        </b-col>
        <b-col cols="4">
          <b-row class="user-info">
            <b-col cols="9">
              {{ article.userId }}
            </b-col>
            <b-col cols="3" v-if="loginUser != this.article.userId">
              <button @click="toggleFollow" class="follow-button">
                <font-awesome-icon
                  :icon="isFollowing ? 'user-minus' : 'user-plus'"
                />
              </button>
            </b-col>
          </b-row>
          <hr />
          <div>
            <b-row class="article-info">
              <b-col cols="9">
                {{ article.placeTitle }}
              </b-col>
              <b-col cols="3">
                <button @click="toggleLike" class="like-button">
                  <font-awesome-icon
                    :icon="heartIcon"
                    :class="{ active: isLiked }"
                  />
                </button>
                <span> {{ recommend.length }}</span>
              </b-col>
            </b-row>
            <hr />
          </div>
          <div class="reply-container">
            <div
              v-for="(rep, i) in reply"
              :key="i"
              style="border-bottom: 1px gainsboro solid"
            >
              {{ rep.replyContent }}
              <br />
              <div style="display: flex; justify-content: right">
                {{ rep.userId }} - {{ rep.replyCreateTime }}
              </div>
            </div>
          </div>
          <div>
            <b-row>
              <b-col cols="8">
                <input
                  type="text"
                  class="reply-input"
                  v-model="inputValue"
                  placeholder="댓글을 입력하세요"
                />
              </b-col>
              <b-col cols="4">
                <button class="create-button" @click="replyWrite">확인</button>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { axiosBuilderWithJwt, baseURL } from '@/api/http';
import { ref } from 'vue';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import HeartCount from '@/components/place/HeartCount';

const userStore = 'trailStore';
export default {
  components: { HeartCount },
  data() {
    return {
      items: [],
      page: 1,
      isLoading: false,
      scrollTimeout: null,
      list1: [],
      list2: [],
      list3: [],
      isModalOpen: false,
      imageUrl: '',
      article: {},
      reply: [],
      inputValue: '',
      likeCount: 0,
      isLiked: ref(false),
      heartIcon: faHeart,
      isFollowing: false,
      isWrite: false,
      loginUser: sessionStorage.getItem('userId'),
      key: '',
      word: '',
      recommend: [],
      followers: [],
      isSort: false,
    };
  },
  computed: {
    ...mapState(userStore, ['follow']),
  },
  mounted() {},
  created() {
    this.isSort = false;
    this.fetchData();
    this.addScrollListener();
  },
  methods: {
    ...mapActions(userStore, ['getFollowList']),
    sort() {
      this.isSort = !this.isSort;
      this.search();
    },
    writePost() {
      // 글쓰기 버튼이 클릭되었을 때 수행할 동작
      this.isWrite = true;
      this.$router.push('/place/placewrite');
    },
    mvList() {
      this.isWrite = false;
      this.$router.push('/place');
    },
    search() {
      this.items = [];
      this.list1 = [];
      this.list2 = [];
      this.list3 = [];
      this.page = 1;
      this.fetchData();
    },
    fetchData() {
      if (this.items.length % 9 == 0) {
        this.isLoading = true;

        // 비동기 작업을 통해 새로운 데이터 가져오기
        // 예: API 호출, 데이터베이스 쿼리 등

        // 새로운 데이터를 items 배열에 추가
        let url;
        if (this.isSort) {
          url = `/place/api/sort?pgno=${this.page}&key=${this.key}&word=${this.word}`;
        } else {
          url = `/place/api?pgno=${this.page}&key=${this.key}&word=${this.word}`;
        }
        axiosBuilderWithJwt()
          .get(url)
          .then(({ data }) => {
            // this.items = data.data;
            this.items.push(...data.data);
            // window.location.reload();
            console.log(this.items);
          });
        //   this.items = [...this.items, ...newItems];
        this.isLoading = false;
        setTimeout(() => {
          for (let i = (this.page - 1) * 9; i < this.items.length; i++) {
            if (i % 3 == 0) this.list1.push(this.items[i]);
            else if (i % 3 == 1) this.list2.push(this.items[i]);
            else if (i % 3 == 2) this.list3.push(this.items[i]);
          }
          console.log(this.list1);
          console.log(this.list2);
          console.log(this.list3);
        }, 500);
        // if(this.page == )
        console.log(this.page);
      }
    },
    addScrollListener() {
      window.addEventListener('scroll', this.handleScroll);
    },
    removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      if (this.isLoading) return;

      clearTimeout(this.scrollTimeout);

      this.scrollTimeout = setTimeout(() => {
        const scrollTrigger = this.$refs.scrollTrigger;
        const scrollPosition = window.innerHeight + window.pageYOffset;
        if (scrollTrigger && scrollPosition >= scrollTrigger.offsetTop) {
          this.page += 1;
          this.fetchData();
        }
      }, 200);
    },
    mkUrl(url) {
      return baseURL + url;
    },
    mvView(imageUrl, title) {
      console.log('이동');
      console.log(title);
      this.article = title;
      this.imageUrl = imageUrl;
      this.isModalOpen = true;
      this.recommend = [];
      axiosBuilderWithJwt()
        .get(`/place/api/${this.article.placeNo}`)
        .then(({ data }) => {
          // this.items = data.data;
          this.reply = data.reply;
          // window.location.reload();
          console.log(this.reply);
        });
      axiosBuilderWithJwt()
        .get(`/place/api/recommend/${this.article.placeNo}`)
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            this.recommend.push(data[i].user_id);
          }
        });

      setTimeout(() => {
        console.log('asdasd' + this.recommend + '  ' + this.loginUser);
        if (this.recommend.includes(this.loginUser)) {
          this.isLiked = true;
        } else this.isLiked = false;
      }, 100);
      this.followers = [];
      for (let i = 0; i < this.follow.length; i++) {
        this.followers.push(this.follow[i].userId);
      }
      if (this.followers.includes(title.userId)) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.inputValue = '';
    },
    replyWrite() {
      if (this.inputValue != '') {
        var user = sessionStorage.getItem('userId');
        console.log(user);
        axiosBuilderWithJwt().post(`/place/api/reply`, {
          replyContent: this.inputValue,
          placeNo: this.article.placeNo,
          parentId: 0,
          userId: user,
        });
        console.log(this.inputValue);
        setTimeout(() => {
          this.inputValue = '';
          this.mvView(this.article.placeImgSrc, this.article);
        }, 300);
      }
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.recommend.push(this.loginUser);
        console.log(this.recommend);
        axiosBuilderWithJwt().post(`/place/api/recommend/add`, {
          user_id: this.loginUser,
          place_no: this.article.placeNo,
        });
      } else {
        const index = this.recommend.indexOf(this.loginUser);
        if (index !== -1) {
          this.recommend.splice(index, 1);
        }
        console.log(this.recommend);
        console.log(this.loginUser + ' ' + this.article.placeNo);
        axiosBuilderWithJwt().delete(
          `/place/api/recommend/del?user_id=${this.loginUser}&place_no=${this.article.placeNo}`
        );
      }
      axiosBuilderWithJwt().put(
        `/place/api/recommend/${this.recommend.length}/${this.article.placeNo}`
      );
    },
    toggleFollow() {
      this.isFollowing = !this.isFollowing;
      if (this.isFollowing) {
        this.followers.push(this.loginUser);
        axiosBuilderWithJwt().post(
          `/user/api/followers/${this.loginUser}/${this.article.userId}`
        );
        setTimeout(() => {
          this.getFollowList({
            userId: this.loginUser,
          });
        }, 300);
      } else {
        axiosBuilderWithJwt().delete(
          `/user/api/followers/del/${this.loginUser}/${this.article.userId}`
        );
        setTimeout(() => {
          this.getFollowList({
            userId: this.loginUser,
          });
        }, 300);
      }
    },
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
};
</script>
<style>
.rectangle-shadow {
  width: 15vh;
  height: 5vh;
  border-radius: 5vh; /* 조절 가능한 값 */
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.img-col {
  padding: 0;
}

.image-wrapper {
  padding-bottom: 10px;
  position: relative;
}

.image-effect {
  transition: transform 0.3s ease; /* transform 속성에 대한 0.3초의 transition 설정 */
}

.image-effect:hover {
  transform: scale(1.1);
  filter: none; /* 흑백 효과 제거 */
}

.container {
  position: relative;
}

.active {
  color: red; /* 하트가 활성화된 상태일 때의 색상 */
}

.custom-modal {
  max-width: 800px;
  margin: 0 auto;
  z-index: 3;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.follow-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
}

.follow-button:hover {
  color: red;
}

.article-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.like-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 5px;
}

.like-button.active {
  color: red;
}

.reply-container {
  height: 500px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.reply-input {
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 10px; /* 원하는 둥근 정도로 조정합니다. */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-button {
  padding: 10px 20px;
  background-color: #a7dbe1; /* 원하는 하늘색 코드로 변경합니다. */
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

.create-button:hover {
  background-color: #6594cb;
}

.rounded-image {
  border-radius: 3%;
  overflow: hidden;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1vh;
  margin-right: 1vw;
}

.select-wrapper {
  position: relative;
  margin-right: 10px;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: #888888 transparent transparent transparent;
  pointer-events: none;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  font-size: 14px;
  padding: 6px 20px 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 120px;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #333;
}

input {
  margin-right: 10px;
  font-size: 14px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.selbtn {
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  background-color: #789ec7;
  color: #fff;
  cursor: pointer;
}

.selbtn:hover {
  background-color: #0056b3;
}

.selbtn:active {
  background-color: #004099;
}
</style>
