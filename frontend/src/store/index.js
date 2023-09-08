import Vue from 'vue';
import Vuex from 'vuex';

import itemStore from './modules/item/itemStore';
import trailStore from './modules/trailStore';
import createPersistedState from 'vuex-persistedstate';
// import userStore from "./modules/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      // reducer: (state) => {
      //   return {
      //     ...state,
      //     isLoggedIn: state.isLoggedIn,
      //   };
      // },
      paths: ['trailStore'],
    }),
  ],
  modules: {
    itemStore,
    trailStore,
    // userStore,
  },
  state: {
    // isLoggedIn: false,
    planInfo: {},
    searchAttractions: [],
    planAttractions: [],
    planAttraction: {},
    selectedAttractions: [],
    selectedAttractionsSet: new Set(),
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    // getPlanInfo(state) {
    //   return state.planInfo;
    // },
    getPlanAttractions(state) {
      return state.planAttractions;
    },
    getPlanAttraction(state) {
      return state.planAttraction;
    },
    getSelectedAttractions(state) {
      return state.selectedAttractions;
    },
    getSelectedAttractionsSet(state) {
      return state.selectedAttractionsSet;
    },
  },
  mutations: {
    // setLoggedIn(state, value) {
    //   state.isLoggedIn = value;
    // },
    setSearchAttractions(state, value) {
      state.searchAttractions = value;
    },
    setPlanInfo(state, value) {
      state.planInfo = value;
    },
    setPlanAttracions(state, value) {
      state.planAttractions = value;
    },
    setPlanAttraction(state, value) {
      state.planAttraction = value;
    },
    setSelectedAttractions(state, value) {
      state.selectedAttractions = [...value];
    },
    changeSelectedAttractions(state, value) {
      state.selectedAttractions = value;
    },
    setSelectedAttractionsSet(state, value) {
      if (state.selectedAttractionsSet.has(value)) {
        state.selectedAttractionsSet.delete(value);
      } else {
        state.selectedAttractionsSet.add(value);
      }
      state.selectedAttractions = [...state.selectedAttractionsSet];
    },
    setSelectedAttractionSetAll(state, value){
      state.selectedAttractionsSet = new Set([...value]);
      state.selectedAttractions = [...state.selectedAttractionsSet];
    }
  },
  actions: {},
});
