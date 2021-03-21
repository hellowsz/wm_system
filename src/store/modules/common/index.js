const state = {
  windowHeight: 0,
  windowWidth: 0,
  filterTableWidth: 0,
};
const mutations = {
  SET_FILTERTABLEWIDTH(state, width) {
    state.filterTableWidth = width;
  },
  SET_WINDOWWIDTH(state, width) {
    state.windowWidth = width;
  },
  SET_WINDOWHEIGHT (state, height) {
    state.windowHeight = height
  },
  SET_FILTERTABLEWIDTH (state, width) {
    state.filterTableWidth = width
  },
};
const actions = {
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
