<template>
  <header>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="custom-nav"
      style="height: 10vh; z-index: 999"
    >
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'home' }" class="nav-link"
          ><img src="@/assets/logo.png" width="100"
        /></router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="">
            <a href="" class="nav-link" @click="mvPlan">여행계획</a>
            <!-- <router-link :to="{ name: 'plan' }" class="nav-link"
              >여행계획</router-link
              > -->
          </b-nav-item>
          <b-nav-item href="">
            <a href="" class="nav-link" @click="mvPlace">핫플레이스</a>
            <!-- <router-link :to="{ name: 'place' }" class="nav-link"
              >핫플레이스
            </router-link> -->
          </b-nav-item>
          <b-nav-item href="">
            <a href="" class="nav-link" @click="mvNotice">공지사항</a>
            <!-- <router-link :to="{ name: 'notice' }" class="nav-link"
              >공지사항
            </router-link> -->
          </b-nav-item>
          <b-nav-item href="">
            <a href="" class="nav-link" @click="mvTrail">둘레길</a>
            <!-- <router-link :to="{ name: 'trail' }" class="nav-link"
              >둘레길
            </router-link> -->
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!isLoggedIn">
          <b-nav-item href="#">
            <router-link :to="{ name: 'login' }">로그인</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'signup' }">회원가입</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link :to="{ name: 'mypage' }">마이페이지</router-link>
          </b-nav-item>
          <b-nav-item @click="logout">로그아웃</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const trailStore = 'trailStore';

export default {
  name: 'TheHeader',
  components: {},
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState(trailStore, ['isLoggedIn']),
    // isLoggedIn() {
    //   return this.$store.getters.isLoggedIn;
    // },
  },
  created() {},
  methods: {
    mvPlan() {
      if (sessionStorage.getItem('userId')) this.$router.push({ name: 'plan' });
      else alert('로그인이 필요합니다.');
    },
    mvPlace() {
      if (sessionStorage.getItem('userId'))
        this.$router.push({ name: 'place' });
      else alert('로그인이 필요합니다.');
    },
    mvNotice() {
      if (sessionStorage.getItem('userId'))
        this.$router.push({ name: 'notice' });
      else alert('로그인이 필요합니다.');
    },
    mvTrail() {
      if (sessionStorage.getItem('userId'))
        this.$router.push({ name: 'trail' });
      else alert('로그인이 필요합니다.');
    },
    ...mapMutations(trailStore, ['setLoggedIn']),
    logout() {
      sessionStorage.clear();
      this.setLoggedIn(false);
      alert('로그아웃 되었습니다.');
      // this.$store.commit('setLoggedIn', false);
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
<style scoped></style>
