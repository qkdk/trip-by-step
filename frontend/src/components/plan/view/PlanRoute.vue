<template>
  <div>
    <div style="margin-bottom: 3%">예상 경비 : {{ price }} 원</div>
    <div v-for="(route, index) in results" :key="index" style="margin-bottom: 5%; z-index: 9999">
      <b-card class="card-style">
        <b-list-group>
          <b-list-group-item
            v-for="plan in route"
            :key="plan.planId"
            :active="activeItem === index"
            @click="activeItem = index"
          >
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <font-awesome-icon
                  v-if="plan.mode === 'WALK'"
                  icon="walking"
                  variant="info"
                  :size="iconSize"
                ></font-awesome-icon>
                <font-awesome-icon
                  v-if="plan.mode === 'BUS'"
                  icon="bus"
                  variant="success"
                  :size="iconSize"
                ></font-awesome-icon>
              </div>
              <div class="icon-text">
                <div class="top-line">
                  <span class="font-weight-bold">{{ plan.start }}</span>
                  <font-awesome-icon icon="chevron-right" class="arrow-icon"></font-awesome-icon>
                  <span class="font-weight-bold">{{ plan.end }}</span>
                </div>
                <div v-if="plan.mode === 'BUS'" class="text-muted">
                  &nbsp;{{ plan.num }}번 {{ plan.count }}개 정류소
                </div>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faWalking, faBus } from "@fortawesome/free-solid-svg-icons";
// import { baseURL } from "@/api/http";

// 아이콘을 라이브러리에 추가
library.add(faWalking, faBus, faChevronRight);
// import axios from "axios";
export default {
  name: "PlanRoute",
  components: { FontAwesomeIcon },
  data() {
    return {
      message: "",
      routes: [],
      results: [],
      legs: [],
      isRepeat: false,
      activeItem: null,
      iconSize: "lg", // 아이콘 크기 조절
      price: 0,
    };
  },
  computed: {
    ...mapState(["planAttractions"]),
  },
  created() {},
  watch: {},

  methods: {
    setRoute() {
      this.price = 0;
      this.routes = [];
      this.results = [];
      // TMap API
      let axiosRequests = [];

      for (let j = 0; j < this.planAttractions.length - 1; j++) {
        let formData = {
          startX: this.planAttractions[j].longitude,
          startY: this.planAttractions[j].latitude,
          endX: this.planAttractions[j + 1].longitude,
          endY: this.planAttractions[j + 1].latitude,
          count: 1,
        };
        console.log(formData);

        axiosRequests.push(
          axios.post(`https://apis.openapi.sk.com/transit/routes`, formData, {
            headers: {
              "Content-Type": "application/json",
              appKey: "A5VkFhWQtQ1ymkH89TVCTN9jTuudvH23Uy28N1J6",
              accept: "application/json",
            },
          })
        );
      }

      Promise.all(axiosRequests)
        .then((responses) => {
          responses.forEach(({ data }, j) => {
            if (data && data.metaData && data.metaData.plan && data.metaData.plan.itineraries) {
              this.legs = data.metaData.plan.itineraries[0].legs;
              this.price = this.price + data.metaData.plan.itineraries[0].fare.regular.totalFare;

              for (let i = 0; i < this.legs.length; i++) {
                if (this.legs[i].start.name == "출발지") {
                  console.log("출발지::::" + this.planAttractions[j].title);
                  this.legs[i].start.name = this.planAttractions[j].title;
                }
                if (this.legs[i].end.name == "도착지") {
                  console.log("도착지::::" + this.planAttractions[j + 1].title);
                  this.legs[i].end.name = this.planAttractions[j + 1].title;
                }
                if (this.legs[i].mode == "WALK") {
                  this.routes.push({
                    mode: this.legs[i].mode,
                    start: this.legs[i].start.name,
                    end: this.legs[i].end.name,
                  });
                  console.log(
                    this.legs[i].start.name +
                      "  에서  " +
                      this.legs[i].end.name +
                      "   로 걸어서 이동"
                  );
                } else if (this.legs[i].mode == "BUS") {
                  this.routes.push({
                    mode: this.legs[i].mode,
                    num: this.legs[i].route,
                    count: this.legs[i].passStopList.stationList.length,
                    start: this.legs[i].start.name,
                    end: this.legs[i].end.name,
                  });
                }
              }
              this.results.push(this.routes);
              this.routes = [];
              this.legs = [];
            } else {
              console.log("응답 데이터가 올바르지 않습니다.");
            }
          });

          console.log("모든 axios 요청이 완료되었습니다.");
          console.log("results:", this.results);
        })
        .catch((error) => {
          console.log(error);
        });

      // // 로컬통신
      // setTimeout(() => {
      //   for (let j = 0; j < this.planAttractions.length - 1; j++) {
      //     axios
      //       .get(`${baseURL}/test.json`)
      //       .then(({ data }) => {
      //         this.legs = data.metaData.plan.itineraries[0].legs;
      //         //   console.log(this.legs);
      //         this.price = this.price + data.metaData.plan.itineraries[0].fare.regular.totalFare;

      //         for (let i = 0; i < this.legs.length; i++) {
      //           if (this.legs[i].start.name == "출발지") {
      //             console.log("출발지::::" + this.planAttractions[j].title);
      //             this.legs[i].start.name = this.planAttractions[j].title;
      //           }
      //           if (this.legs[i].end.name == "도착지") {
      //             console.log("도착지::::" + this.planAttractions[j + 1].title);
      //             this.legs[i].end.name = this.planAttractions[j + 1].title;
      //           }
      //           if (this.legs[i].mode == "WALK") {
      //             this.routes.push({
      //               mode: this.legs[i].mode,
      //               start: this.legs[i].start.name,
      //               end: this.legs[i].end.name,
      //             });
      //             console.log(
      //               this.legs[i].start.name +
      //                 "  에서  " +
      //                 this.legs[i].end.name +
      //                 "   로 걸어서 이동"
      //             );
      //           } else if (this.legs[i].mode == "BUS") {
      //             this.routes.push({
      //               mode: this.legs[i].mode,
      //               num: this.legs[i].route,
      //               count: this.legs[i].passStopList.stationList.length,
      //               start: this.legs[i].start.name,
      //               end: this.legs[i].end.name,
      //             });
      //           }
      //         }
      //         this.results.push(this.routes);
      //         this.routes = [];
      //         this.legs = [];
      //       })
      //       .catch((error) => {
      //         console.error(error);
      //       });
      //   }
      // }, 300);
    },
  },
};
</script>

<style scoped>
.card-style {
  /* 원하는 크기로 조절하세요 */
  width: 100%;
}
.fa-walking,
.fa-bus {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.arrow-icon {
  margin: 0 0.5rem;
  position: sticky;
  top: 0;
}

.icon-text {
  display: flex;
  align-items: center;
  position: relative;
}

.top-line {
  display: flex;
  justify-content: center;
}

.icon-text:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ccc;
  z-index: -1;
}
</style>
