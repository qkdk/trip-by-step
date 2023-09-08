<template>
  <div style="display: flex; flex-direction: column">
    <!-- <div class="preview">
      <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="preview-image" />
    </div> -->
    <div class="form-group">
      <div class="custom-container">
        <input id="files" type="file" multiple class="custom-input" @change="handleFileUpload" />
      </div>
    </div>
    <div class="custom-container">
      아이디
      <input type="text" class="custom-input" v-model="formData.userId" />
    </div>
    <div class="custom-container">
      비밀번호
      <input type="password" class="custom-input" v-model="formData.userPw" />
    </div>
    <div class="custom-container">
      비밀번호 확인
      <input type="password" class="custom-input" v-model="userPwCheck" />
    </div>
    <div class="custom-container">
      이름
      <input type="text" class="custom-input" v-model="formData.userName" />
    </div>
    <div class="custom-container">
      이메일
      <div style="display: flex; width: 100%; height: 100%">
        <input type="text" class="custom-input" v-model="formData.userEmail" />
        <input
          type="email"
          class="custom-second-input"
          placeholder="ssafy.com"
          v-model="formData.userDomain"
        />
      </div>
    </div>
    <div class="custom-container">
      <button class="submit-button" @click="submitSignIn">회원가입</button>
      <router-link to="/" class="back-button">돌아가기</router-link>
    </div>
  </div>
</template>

<script>
// import http from "@/api/http";
import axios from "axios";
import { baseURL } from "@/api/http";

export default {
  name: "JoinForm",
  data() {
    return {
      userPwCheck: "",
      formData: {
        userId: "",
        userPw: "",
        userName: "",
        userEmail: "",
        userDomain: "",
      },
      imageUrl: null,
      files: [],
      fileLabelText: "파일을 선택해주세요",
    };
  },
  methods: {
    handleFileUpload() {
      this.files = Array.from(event.target.files);
      console.log(this.files);
      const uploadFile = this.files[0];
      if (uploadFile) {
        this.image = uploadFile;
        this.imageUrl = URL.createObjectURL(uploadFile);
        this.imageLabelText = uploadFile.name;
      } else {
        this.image = null;
        this.imageUrl = null;
        this.imageLabelText = "이미지를 선택해주세요";
      }
    },
    afterSignInSuccess(data) {
      if (data.result) {
        alert(data.msg);
        this.$router.push("/");
      }
    },
    afterSignInFailure(data) {
      alert(data);
    },
    submitSignIn() {
      console.log(JSON.stringify(this.formData));
      if (this.checkPwEqual()) {
        const joinData = new FormData();
        joinData.append("userId", this.formData.userId);
        joinData.append("userPw", this.formData.userPw);
        joinData.append("userName", this.formData.userName);
        joinData.append("userEmail", this.formData.userEmail);
        joinData.append("userDomain", this.formData.userDomain);
        joinData.append("file", this.files[0]);
        axios
          .post(`${baseURL}/user/api/join`, joinData, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          })
          .then(({ data }) => this.afterSignInSuccess(data))
          .catch(({ response }) => this.afterSignInFailure(response.data));

        // http
        //   .post(`/user/api/join`, this.formData)
        //   .then(({ data }) => this.afterSignInSuccess(data))
        //   .catch(({ response }) => this.afterSignInFailure(response.data));
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    checkPwEqual() {
      return this.userPwCheck === this.formData.userPw;
    },
  },
};
</script>

<style scoped>
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

.back-button {
  border: none;
  background-color: black;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: white;
  margin-top: 10px;
}

.custom-input {
  border: none;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: gray;
}

.custom-second-input {
  border: none;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  outline: none;
  color: gray;
  margin-left: 5px;
}

.custom-second-input::placeholder {
  color: gainsboro;
}

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
</style>
