<template>
  <div class="floating-box">
    <div style="display: flex; color: red; align-items: center">
      <font-awesome-icon :icon="['fas', 'heart']"/>
      <div style="padding-left: 3px">
        {{ recommend }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeartCount",
  props: ["recommend"],

}
</script>

<style scoped>
.floating-box {
  position: absolute;
  z-index: 2; /* overlay보다 위에 오도록 설정 */
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
  padding: 10px;
  border-radius: 5px;
}

</style>