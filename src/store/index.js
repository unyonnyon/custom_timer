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
      return state.config.sound;
    },
  },
  mutations: {
    setSound(state, payload) {
      state.config.sound = payload;
    },
  },
  actions: {
    setSound(context, payload) {
      context.commit("setSound", payload);
    },
  },
  modules: {},
});
