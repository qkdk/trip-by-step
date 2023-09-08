<template>
  <div class="centered-item">
    <div class="error-box">
      로그인이 필요합니다.
      <router-link to="/">메인화면으로 돌아가기</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppError"
}
</script>

<style scoped>
.centered-item {
  width: 100vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-box {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>