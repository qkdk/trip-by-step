<template>
  <div class="container">
    <div class="form-wrapper">
      <div class="form-group">
        <label for="title">제목</label>
        <input id="title" type="text" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label for="files">파일 선택</label>
        <div class="custom-file">
          <input
            id="files"
            type="file"
            multiple
            class="custom-file-input"
            @change="handleFileUpload"
          />
          <label class="custom-file-label" for="files">{{ fileLabelText }}</label>
        </div>
      </div>
    </div>
    <div class="preview">
      <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="preview-image" />
    </div>
    <div class="buttons">
      <button class="btn btn-info" @click="submitPost">게시</button>
      <button class="btn btn-secondary" @click="mvList">목록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseURL } from "@/api/http";
export default {
  name: "PlaceWrite",
  components: {},
  data() {
    return {
      message: "",
      title: "",
      files: [],
      fileLabelText: "파일을 선택해주세요",
      imageUrl: null,
    };
  },
  created() {},
  methods: {
    mvList() {
      // this.isWrite = false;
      this.$router.push("/place");
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
    submitPost() {
      const formData = new FormData();
      formData.append("placeTitle", this.title);
      formData.append("placeContent", "123");
      var loginUser = sessionStorage.getItem("userId");
      formData.append("userId", loginUser);
      for (let i = 0; i < this.files.length; i++) {
        formData.append("upfile", this.files[i]);
      }
      axios
        .post(`${baseURL}/place/api/write`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            this.$router.push("/place");
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 20px auto 0;
  padding: 20px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

label {
  font-weight: bold;
}

.custom-file-input {
  cursor: pointer;
}

.custom-file-label::after {
  content: "파일 선택";
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.preview {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.preview-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.buttons button {
  margin-left: 10px;
}
</style>
