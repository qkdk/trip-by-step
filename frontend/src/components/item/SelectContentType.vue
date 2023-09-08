<template>
  <b-col class="sm-3" style="padding: 0">
    <b-form-select v-model="contentTypeId" :options="options" @change="changeContentType"></b-form-select>
  </b-col>
</template>

<script>
export default {
  name: "SelectContentType",
  data() {
    return {
      contentTypeId: 0,
      options: [
        {value: 0, text: "컨텐츠를 선택해주세요"},
        {value: 12, text: "관광지"},
        {value: 14, text: "문화시설"},
        {value: 15, text: "축제공연행사"},
        {value: 25, text: "여행코스"},
        {value: 28, text: "레포츠"},
        {value: 32, text: "숙박"},
        {value: 38, text: "쇼핑"},
        {value: 39, text: "음식점"},
      ]
    }
  },
  methods:{
    changeContentType(){
      this.$emit("select-content-type", this.contentTypeId);
    }
  }
}
</script>

<style scoped>

</style>