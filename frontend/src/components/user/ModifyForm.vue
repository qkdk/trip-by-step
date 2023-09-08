<template>
  <div style="display: flex; flex-direction: column">
    <div class="form-group">
      <div class="custom-container">
        <input id="files" type="file" multiple class="custom-input" @change="handleFileUpload"/>
      </div>
    </div>
    <div class="custom-container">
      이름
      <input type="text" class="custom-input" v-model="modifyForm.userName"/>
    </div>
    <div class="custom-container">
      새 비밀번호
      <input type="password" class="custom-input" v-model="modifyForm.userPw"/>
    </div>
    <div class="custom-container">
      새 비밀번호 확인
      <input type="password" class="custom-input" v-model="newPwCheck"/>
    </div>
    <div class="custom-container">
      이메일
      <div class="row-container">
        <input type="text" class="custom-input" v-model="modifyForm.userEmail"/>
        <input
            type="email"
            class="custom-second-input"
            placeholder="ssafy.com"
            v-model="modifyForm.userDomain"
        />
      </div>
    </div>
    <div class="alert-container">
      <br/>
      현재 비밀번호*
      <input type="password" class="custom-input" v-model="modifyForm.userCurPw"/>
    </div>

    <div class="custom-container">
      <div class="row-container">
        <button class="submit-button" @click="submitModify">변경</button>
        <button
            class="submit-button"
            style="margin-left: 5px; background-color: lightcoral"
            @click="submitDelete"
        >
          삭제
        </button>
      </div>
      <router-link :to="{ name: 'home' }" class="back-button">취소</router-link>
    </div>
  </div>
</template>

<script>
import {axiosBuilderWithJwt, http} from "@/api/http";


export default {
  name: "ModifyForm",
  data() {
    return {
      newPwCheck: "",
      modifyForm: {
        userName: "",
        userPw: "",
        userEmail: "",
        userDomain: "",
        userCurPw: "",
      },
      imageUrl: null,
      files: [],
      fileLabelText: "파일을 선택해주세요",
    };
  },
  created() {
    this.getUserDetail();
  },
  methods: {
    afterModifySuccess(data) {
      alert(data.msg);
      this.$router.push({name: "home"});
    },
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
    submitModify() {
      if (this.checkPwEqual()) {
        if (this.files[0] == undefined) {
          axiosBuilderWithJwt().put("/user/api/modify", this.modifyForm)
              .then(({data}) => this.afterModifySuccess(data))
              .catch(({response}) => alert(response.data));
        } else {
          // 프로필 사진을 변경할 경우
          const formData = new FormData();
          formData.append("userName", this.modifyForm.userName);
          formData.append("userPw", this.modifyForm.userPw);
          formData.append("userEmail", this.modifyForm.userEmail);
          formData.append("userDomain", this.modifyForm.userDomain);
          formData.append("userCurPw", this.modifyForm.userCurPw);
          formData.append("file", this.files[0]);
          http
              .put(`/user/api/modify/profile`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                },
              })
              .then(({data}) => this.afterModifySuccess(data))
              .catch(({response}) => alert(response.data));
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    checkPwEqual() {
      return this.newPwCheck === this.modifyForm.userPw;
    },
    afterDeleteSuccess(data) {
      alert(data.msg);
      this.$router.push({name: "home"});
    },
    submitDelete() {
      axiosBuilderWithJwt().delete("/user/api/delete", {
        data: {
          userPw: this.modifyForm.userCurPw,
        },
      })
          .then(({data}) => this.afterDeleteSuccess(data))
          .catch(({response}) => alert(response.data));
    },
    getUserDetail() {
      axiosBuilderWithJwt()
          .get(`/user/api/${sessionStorage.getItem("userId")}`)
          .then(({data}) => {
            this.modifyForm.userEmail = data.data.userEmail;
            this.modifyForm.userDomain = data.data.userDomain;
            this.modifyForm.userName = data.data.userName;
          })
          .catch(({response}) => alert(response.data));
    },
  },
};
</script>

<style scoped>
.row-container {
  display: flex;
  width: 100%;
  height: 100%;
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

.alert-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 33vw;
  padding-right: 33vw;
  margin-top: 5px;
  margin-bottom: 5px;
  color: lightcoral;
}
</style>
