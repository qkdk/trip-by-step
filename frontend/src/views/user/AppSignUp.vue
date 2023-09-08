<template>
  <div>
    <div style="font-size: 400%; margin-top: 5vh" >
      SIGN UP
    </div>
    <join-form style="margin-bottom: 5vh"></join-form>
  </div>
</template>

<script>
import JoinForm from "@/components/user/SignUpForm";

export default {
  name: "AppJoin",
  components: {
    JoinForm,
  },
};
</script>

<style scoped></style>
