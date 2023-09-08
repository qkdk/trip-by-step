import { axiosBuilderWithJwt } from "@/api/http";

function sidoList(success, fail) {
  axiosBuilderWithJwt().get(`/trail/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  axiosBuilderWithJwt().get(`/trail/gugun/${params.sido}`).then(success).catch(fail);
}

export { sidoList, gugunList };
