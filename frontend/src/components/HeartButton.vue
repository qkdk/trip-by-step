<template>
  <button :class="{ 'heart-button': true, 'red': isClicked }" @click="toggleHeart">
    <font-awesome-icon :icon="['fas', 'heart']"/>
  </button>
</template>

<script>
export default {
  name: "HeartButton",
  props: ["isClickable"],
  data() {
    return {
      isClicked: false
    };
  },
  created() {
    this.isClicked = !this.isClickable;
  },
  watch: {
    isClickable(newValue){
      this.isClicked = !newValue;
    }
  },
  methods: {
    toggleHeart() {
      this.isClicked = !this.isClicked;
      this.$emit("heart-button-click", this.isClicked);
    }
  }
};
</script>

<style scoped>
.heart-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.red {
  color: red;
}
</style>
