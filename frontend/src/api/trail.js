import { axiosBuilderWithJwt } from "@/api/http";

function trailList(params, success, fail) {
  console.log(params);
  axiosBuilderWithJwt().get(`/trail/${params.sido}/${params.gugun}`).then(success).catch(fail);
}

function trailBoardList(params, success, fail) {
  axiosBuilderWithJwt()
    .get(`/trail/board?key=${params.key}&word=${params.word}`)
    .then(success)
    .catch(fail);
}

function getTrailBoardLatest(success, fail) {
  axiosBuilderWithJwt().get(`/trail/board/view`).then(success).catch(fail);
}

function getJoinMember(params, success, fail) {
  axiosBuilderWithJwt().get(`/trail/joinmember/${params.no}`).then(success).catch(fail);
}

export { trailList, trailBoardList, getTrailBoardLatest, getJoinMember };
