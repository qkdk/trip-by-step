import { sidoList, gugunList } from '@/api/item/item.js';

const itemStore = {
  namespaced: true,
  state: {
    sidos: [{ value: 0, text: '시/도를 선택해주세요' }],
    guguns: [{ value: 0, text: '구/군을 선택해주세요' }],
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: 0, text: '시/도를 선택해주세요' }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: 0, text: '구/군을 선택해주세요' }];
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit('SET_SIDO_LIST', data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = { sido: sidoCode };
      gugunList(
        params,
        ({ data }) => {
          commit('SET_GUGUN_LIST', data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default itemStore;
