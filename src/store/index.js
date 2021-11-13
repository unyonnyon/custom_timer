import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      sound: false,
    },
  },
  getters: {
    isSoundActive(state) {
      return state.sound;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
