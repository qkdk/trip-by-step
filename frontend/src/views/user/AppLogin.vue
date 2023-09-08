<template>
  <div>
    <div style="font-size: 400%; margin-top: 5vh">
      LOG IN
    </div>
    <log-in-form></log-in-form>
  </div>
</template>

<script>
import LogInForm from "@/components/user/LoginForm";

export default {
  name: "AppLogin",
  components: {LogInForm}
}
</script>

<style scoped>

</style>