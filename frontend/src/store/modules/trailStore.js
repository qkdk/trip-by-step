import {
  trailList,
  trailBoardList,
  getTrailBoardLatest,
  getJoinMember,
} from '@/api/trail';
import { axiosBuilderWithJwt } from '@/api/http';

const trailStore = {
  namespaced: true,
  state: {
    trails: [],
    trail: null,
    boards: [],
    board: null,
    isWritePage: true,
    members: [],
    follow: [],
    location: {},
    isLoggedIn: false,
  },
  getters: {
    GET_TRAIL_LOCATION(state) {
      return state.location;
    },
    getPlanInfo(state) {
      return state.planInfo;
    },
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    SET_TRAIL_LOCATION(state, loc) {
      state.location = loc;
      console.log(
        loc.startX + ' ' + loc.startY + ' ' + loc.endX + ' ' + loc.endY
      );
    },
    SET_FOLLOW_LIST(state, follow) {
      state.follow = follow;
    },
    CLEAR_TRAIL_LIST(state) {
      state.trails = [];
      state.trail = null;
    },
    CLEAR_BOARD_LIST(state) {
      state.boards = [];
      state.board = null;
      console.log('초기화');
    },
    CLEAR_TRAIL_BOARD(state) {
      state.board = null;
    },
    SET_TRAIL_LIST(state, trails) {
      state.trails = trails;
    },
    SET_DETAIL_TRAIL(state, trail) {
      state.trail = trail;
    },
    SET_BOARD_LIST(state, boards) {
      state.boards = boards;
      console.log(boards);
    },
    SET_DETAIL_BOARD(state, board) {
      state.board = board;
      console.log('보드 설정' + board);
    },
    CHANGE_WRITE_PAGE(state) {
      state.isWritePage = !state.isWritePage;
      console.log(state.isWritePage);
    },
    SET_ISWRITE_TRUE(state) {
      state.isWritePage = true;
      console.log(state.isWritePage);
    },
    SET_JOIN_MEMBER(state, member) {
      state.members = member;
    },
  },
  actions: {
    getFollowList: ({ commit }, params) => {
      axiosBuilderWithJwt()
        .get(`/user/api/followers/${params.userId}`)
        .then(({ data }) => {
          console.log(data);
          commit('SET_FOLLOW_LIST', data);
        });
    },
    getTrailList: ({ commit }, params) => {
      trailList(
        params,
        ({ data }) => {
          commit('SET_TRAIL_LIST', data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getTrailBoardList: ({ commit }, params) => {
      trailBoardList(
        params,
        ({ data }) => {
          commit('SET_BOARD_LIST', data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    setTrail: ({ commit }, params) => {
      commit('SET_DETAIL_TRAIL', params);
    },
    setBoard: ({ commit }, params) => {
      commit('SET_DETAIL_BOARD', params);
    },
    setBoardLatest: ({ commit }) => {
      getTrailBoardLatest(
        ({ data }) => {
          console.log(data);
          commit('SET_DETAIL_BOARD', data);
          const params = {
            no: data.trail_board_no,
          };
          getJoinMember(
            params,
            ({ data }) => {
              commit('SET_JOIN_MEMBER', data);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    setJoinMember: ({ commit }, params) => {
      getJoinMember(
        params,
        ({ data }) => {
          commit('SET_JOIN_MEMBER', data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default trailStore;
