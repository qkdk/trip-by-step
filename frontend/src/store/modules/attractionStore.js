const attractionStore = {
  namespaced: true,
  state: {
    attractions: [],
  },
  getters: {},
  mutations: {
    SET_ATTRACTION_LIST(state, attraction) {
      state.attractions.push(attraction);
    },
  },
  actions: {},
};

export default attractionStore;
