<template>
  <div>
    <b-row style="margin: 0">
      <b-col cols="5" style="display: flex; flex-direction: column; padding: 0">
        <div style="height: 80vh; width: 100%">
          <div class="title-container">
            <h1>선택한 둘레길</h1>
          </div>
          <trail-view v-if="!isView" class="trail-view-container"></trail-view>
          <trail-map v-else style="height: 70vh; width: 100%"></trail-map>
        </div>

        <div class="button-container">
          <button class="custom-button" @click="isView = !isView">전환</button>
        </div>
      </b-col>
      <b-col cols="7" style="padding: 0; padding-left: 2vw; padding-right: 2vw">
        <div class="title-container">
          <h1></h1>
        </div>
        <TrailBoardWriteItem
            class="write-container"
            v-if="isWritePage"
        ></TrailBoardWriteItem>
        <TrailBoardView class="write" v-else></TrailBoardView>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TrailView from './TrailView.vue';
import TrailBoardWriteItem from './TrailBoardWriteItem.vue';
import TrailBoardView from './TrailBoardView.vue';
import TrailMap from '@/components/trail/TrailMap';
import {mapMutations, mapState} from 'vuex';
import jsonp from 'jsonp';
import {axiosBuilderWithJwt} from '@/api/http';

const trailStore = 'trailStore';
export default {
  name: 'TrailBoardWrite',
  components: {
    TrailView,
    TrailBoardWriteItem,
    TrailBoardView,
    TrailMap,
  },
  data() {
    return {
      message: '',
      isView: true,
      cityName: {},
      isError: false,
      trailLocation: {},
    };
  },
  computed: {
    ...mapState(trailStore, ['isWritePage']),
    ...mapState(trailStore, ['trail']),
  },
  created() {
    console.log(this.trail.start_detail_addr + '제발 좀 되라 친구야');
    setTimeout(() => {
      axiosBuilderWithJwt()
          .get(`/trail/getcity/${this.trail.trail_id}`)
          .then(({data}) => {
            this.cityName.startName =
                data.startSidoName +
                ' ' +
                data.startGugunName +
                ' ' +
                this.trail.start_detail_addr;
            this.cityName.endName =
                data.endSidoName +
                ' ' +
                data.endGugunName +
                ' ' +
                this.trail.end_detail_addr;
            console.log(
                this.cityName.startName +
                ' ' +
                this.cityName.endName +
                ' asdadasdasdasd'
            );
          });
    }, 300);
    setTimeout(() => {
      jsonp(
          `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.startName}&refine=true&simple=true&format=json&type=PARCEL&key=6D07D920-C421-3097-98C5-778C11FA6B49`,
          null,
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (data.response.status == 'OK') {
                console.log(data + 'startOk');
                this.trailLocation = {
                  startX: data.response.result.point.x,
                  startY: data.response.result.point.y,
                };
                // console.log('ok');
              } else {
                this.isError = true;
              }
            }
          }
      );
      // axios
      //     .get(
      //         `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.startName}&refine=true&simple=true&format=json&type=PARCEL&key=6D07D920-C421-3097-98C5-778C11FA6B49`
      //     )
      //     .then(({data}) => {
      //       if (data.response.status == 'OK') {
      //         console.log(data + 'startOk');
      //         this.trailLocation = {
      //           startX: data.response.result.point.x,
      //           startY: data.response.result.point.y,
      //         };
      //         // console.log('ok');
      //       } else {
      //         this.isError = true;
      //       }
      //     });
    }, 500);

    setTimeout(() => {
      if (this.isError) {
        console.log('에러발생');
        jsonp(
            `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.startName}&refine=true&simple=true&format=json&type=ROAD&key=6D07D920-C421-3097-98C5-778C11FA6B49`,
            null,
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
                if (data.response.status != 'OK') {
                  console.log(data + ' startOk');
                  this.trailLocation.startX = null;
                  this.trailLocation.startY = null;
                } else {
                  this.trailLocation = {
                    startX: data.response.result.point.x,
                    startY: data.response.result.point.y,
                  };
                }
              }
            }
        );
        // axios
        //   .get(
        //     `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.startName}&refine=true&simple=true&format=json&type=ROAD&key=6D07D920-C421-3097-98C5-778C11FA6B49`
        //   )
        //   .then(({ data }) => {
        //     console.log(data);
        //     if (data.response.status != 'OK') {
        //       console.log(data + ' startOk');
        //       this.trailLocation.startX = null;
        //       this.trailLocation.startY = null;
        //     } else {
        //       this.trailLocation = {
        //         startX: data.response.result.point.x,
        //         startY: data.response.result.point.y,
        //       };
        //     }
        //   });
      }
    }, 750);
    setTimeout(() => {
      jsonp(
          `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.endName}&refine=true&simple=true&format=json&type=PARCEL&key=6D07D920-C421-3097-98C5-778C11FA6B49`,
          null,
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (data.response.status == 'OK') {
                console.log(data + ' endOd');
                this.trailLocation.endX = data.response.result.point.x;
                this.trailLocation.endY = data.response.result.point.y;
                // console.log('ok');
              } else {
                this.isError = true;
              }
            }
          }
      );
      // axios
      //   .get(
      //     `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.endName}&refine=true&simple=true&format=json&type=PARCEL&key=6D07D920-C421-3097-98C5-778C11FA6B49`
      //   )
      //   .then(({ data }) => {
      //     if (data.response.status == 'OK') {
      //       console.log(data + ' endOd');
      //       this.trailLocation.endX = data.response.result.point.x;
      //       this.trailLocation.endY = data.response.result.point.y;
      //       // console.log('ok');
      //     } else {
      //       this.isError = true;
      //     }
      //   });
    }, 1000);

    setTimeout(() => {
      if (this.isError) {
        console.log('에러발생');
        jsonp(
            `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.endName}&refine=true&simple=true&format=json&type=ROAD&key=6D07D920-C421-3097-98C5-778C11FA6B49`,
            null,
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data + ' endOk');
                if (data.response.status != 'OK') {
                  this.trailLocation.endX = null;
                  this.trailLocation.endY = null;
                } else {
                  this.trailLocation.endX = data.response.result.point.x;
                  this.trailLocation.endY = data.response.result.point.y;
                }
              }
            }
        );
        // axios
        //   .get(
        //     `http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${this.cityName.endName}&refine=true&simple=true&format=json&type=ROAD&key=6D07D920-C421-3097-98C5-778C11FA6B49`
        //   )
        //   .then(({ data }) => {
        //     console.log(data + ' endOk');
        //     if (data.response.status != 'OK') {
        //       this.trailLocation.endX = null;
        //       this.trailLocation.endY = null;
        //     } else {
        //       this.trailLocation.endX = data.response.result.point.x;
        //       this.trailLocation.endY = data.response.result.point.y;
        //     }
        //   });
      }
    }, 1300);
    setTimeout(() => {
      console.log(this.trailLocation);
      this.SET_TRAIL_LOCATION(this.trailLocation);
    }, 1500);
  },
  methods: {
    ...mapMutations(trailStore, ['SET_TRAIL_LOCATION']),
  },
};
</script>

<style scoped>
.button-container {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-button {
  width: 50%;
  height: 50%;
  border: none;
  border-radius: 5px;
  background-color: #a7dbe1;
}

.custom-button:hover {
  background-color: #81c5fd;
}

.title-container {
  height: 10vh;
  align-items: center;
  padding: 1vh;
}

.trail-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  padding: 5vh;
}
</style>
