<template>
  <footer>
    <div class="container-fluid bg-light position-relative bottom-0" style="height: 15vh">
      <div class="row">
        <div class="col-2 mt-3 mb-3">
          <a class="navbar-brand" href="#">
            <img src="@/assets/logo.png" alt="" width="100" />
          </a>
        </div>
        <div class="mb-4 col-10 ml-auto">
          <div class="row mt-3 text-secondary text-left">
            <div class="col-5">
              <p>메일. contact@tripbystep.net<br />전화. 1234-5678<br />팩스. 02-1234-5678</p>
            </div>
            <div class="col-5">
              <p>
                (주) TripByStep | 대표이사 이승종, 안규보 | 대전 유성구 동서대로 98-39 203호<br />사업자등록번호
                123-45-67890 사업자정보확인<br />개인정보 처리방침 | 이용약관
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
