<template>
  <div>
    <b-row style="margin: 0">
      <b-col cols="2" style="padding: 0; border-right: 1px solid gainsboro">
        <PlaceSidebar></PlaceSidebar>
      </b-col>
      <b-col cols="10">
        <router-view></router-view>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import PlaceList from "@/components/place/PlaceList.vue";
import PlaceSidebar from '@/components/place/PlaceSidebar.vue';
export default {
  name: 'AppPlace',
  components: {
    // PlaceList,
    PlaceSidebar,
  },
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
