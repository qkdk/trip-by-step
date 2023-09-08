<template>
  <div style="min-height: 75vh">
    <div class="follow-title" style=" border-bottom: none">
      <h3>팔로워</h3>
    </div>
    <div v-for="(user, index) in follow" :key="index" class="follow-list-container">
      <div class="follow-container">
        <img
            :src="mkUrl(user.userImgSrc)"
            width="50"
            class="userImg"
            onerror="this.src='https://github.com/qkdk/enjoy-trip/assets/86948395/c643b90b-fb65-4678-8dd7-7321cb0fdfaf'"
        />
        <div class="follow-id-container">
          {{ user.userId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { baseURL } from "@/api/http";

const userStore = "trailStore";

export default {
  name: "PlaceSidebar",
  components: {},
  data() {
    return {
      message: "",
      loginUser: sessionStorage.getItem("userId"),
    };
  },
  computed: {
    ...mapState(userStore, ["follow"]),
  },
  created() {
    this.getFollowList({
      userId: this.loginUser,
    });
    setTimeout(() => {
      console.log(this.follow + "asdasdadasd");
    }, 1000);
  },
  methods: {
    ...mapActions(userStore, ["getFollowList"]),
    mkUrl(url) {
      return baseURL + url;
    },
  },
};
</script>

<style scoped>
.userImg {
  border-radius: 10%;
}

.follow-title {
  padding-top: 1vh;
  padding-left: 1vw;
  display: flex;
  border-bottom: 1px gainsboro solid;
}

.follow-list-container{

}

.follow-container {
  display: flex;
  justify-content: left;
  margin-top: 1vh;
  padding-left: 1vw;
}

.follow-id-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1vw;
}
</style>
