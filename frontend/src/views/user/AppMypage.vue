<template>
  <div>
    <div style="font-size: 300%">
      {{userId}}
    </div>
    <div style="font-size: 200%">
        마이페이지
    </div>
    <modify-form style="margin-bottom: 5vh"></modify-form>
  </div>
</template>

<script>
import ModifyForm from "@/components/user/ModifyForm";

export default {
  name: "AppMypage",
  components: {ModifyForm},
  data(){
    return{
      userId: "",
    }
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
  }
}
</script>

<style scoped>

</style>