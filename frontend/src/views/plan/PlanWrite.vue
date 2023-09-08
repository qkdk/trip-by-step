<template>
  <div>
    <div>
      <b-row style="margin: 0">
        <b-col cols=3 style="padding-right: 0px; padding-left: 0px;">
          <plan-write-detail>
          </plan-write-detail>
        </b-col>
        <b-col cols=6 style="padding-right: 0px; padding-left: 0px;">
          <main-map style="height: 90vh"></main-map>
        </b-col>
        <b-col cols=3 style="padding-right: 0px; padding-left: 0px">
          <plan-write-attractions></plan-write-attractions>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import PlanWriteDetail from "@/components/plan/write/PlanWriteDetail";
import PlanWriteAttractions from "@/components/plan/write/PlanWriteAttractions";
import MainMap from "@/components/plan/MainMap";

export default {
  name: "PlanWrite",
  components: {MainMap, PlanWriteAttractions, PlanWriteDetail}
}
</script>

<style scoped>

</style>