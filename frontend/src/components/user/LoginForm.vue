<template>
  <div>
    <div class="custom-container">
      아이디
      <input class="custom-input" v-model="loginForm.userId" />
    </div>
    <div class="custom-container">
      비밀번호
      <input type="password" class="custom-input" v-model="loginForm.userPw" />
    </div>
    <div class="custom-container" style="font-size: small">
      <router-link to="#">비밀번호를 잊으셨나요?</router-link>
    </div>
    <br />
    <div class="custom-container">
      <button class="submit-button" @click="submitLogin">로그인</button>
    </div>
    <br />
    <div>
      <span style="font-size: small"
        >회원이 아니세요?
        <router-link to="signup">회원가입 하기</router-link></span
      >
    </div>
    <br />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { http } from '@/api/http';

const trailStore = 'trailStore';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
        userId: '',
        userPw: '',
      },
    };
  },
  methods: {
    ...mapMutations(trailStore, ['setLoggedIn']),
    afterLoginSuccess(data) {
      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('userRole', data.userRole);
      sessionStorage.setItem('accessToken', data.accessToken);

      // this.$store.commit("setLoggedIn", true);
      this.setLoggedIn(true);
      this.$router.push('/');
    },
    submitLogin() {
      http
        .post('/authenticate', this.loginForm)
        .then(({ data }) => this.afterLoginSuccess(data.data))
        .catch(() => alert('아이디 혹은 비밀번호가 일치하지 않습니다.'));
    },
  },
};
</script>

<style scoped>
.custom-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 33vw;
  padding-right: 33vw;
  margin-top: 5px;
  margin-bottom: 5px;
  color: darkgrey;
}

.custom-input {
  border: none;
  border-bottom: 1px solid gainsboro;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  padding: 10px;
  color: gray;
}

.custom-input:focus {
  border-bottom: 1px solid deepskyblue;
}

.submit-button {
  border: none;
  background-color: #a7dbe1;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  margin-top: 10px;
}
</style>
