<template>
  <div style="display: flex; height: 90vh;">
    <div style="display: flex; justify-content: left; width: 70vw">
      <div class="video-container">
        <video
            src="https://github.com/qkdk/enjoy-trip/assets/86948395/8fec0a29-2c60-4bf0-aa6f-85a3eb035a36"
            autoplay loop muted>
        </video>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; width: 30vw">
      <div class="centered-text">
        <router-link :to="{name: 'planwrite'}" class="route-text">여행 가기</router-link>
      </div>
      <div class="centered-text">
        <router-link :to="{name: 'planview'}" class="route-text">여행 구경하기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanMain"
}
</script>

<style scoped>
.centered-text {
  background-color: #f8f9fa;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.route-text {
  color: black;
  font-size: xxx-large;
}

.video-container {
  width: 100%; /* 부모 요소의 너비에 맞게 설정 */
  height: 0; /* 초기에 높이를 0으로 설정 */
  padding-bottom: 80%; /* 비디오의 가로 세로 비율에 따라 조정 (16:9 비율은 56.25%) */
  position: relative;
  overflow: hidden;
}

.video-container video {
  width: 100%; /* 비디오 요소의 너비를 100%로 설정하여 부모 요소에 맞춤 */
  height: 100%; /* 비디오 요소의 높이를 100%로 설정하여 부모 요소에 맞춤 */
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover; /* 비디오를 잘라서 부모 요소에 맞게 표시 */
}

</style>