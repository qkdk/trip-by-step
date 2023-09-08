import { axiosBuilderWithJwt } from "@/api/httpJwt";

const userStore = {
  namespace: true,
  state: {
    follow: [],
  },
  getters: {},
  mutations: {
    SET_FOLLOW_LIST(state, follow) {
      state.follow = follow.followee_id;
    },
  },
  actions: {
    getFollowList: ({ commit }, params) => {
      axiosBuilderWithJwt()
        .get(`/user/api/followers/${params.userId}`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_FOLLOW_LIST", data);
        });
    },
  },
};

export default userStore;
