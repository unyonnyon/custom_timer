import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      sound: false,
      mvpAlertTimings: [],
    },
    rawSounds: require.context("../assets", true, /\.wav$/),
  },
  getters: {
    isSoundActive(state) {
      return state.config.sound;
    },
    mvpAlertTimings(state) {
      return state.config.mvpAlertTimings;
    },
    rawSounds(state) {
      return state.rawSounds;
    },
  },
  mutations: {
    setSound(state, payload) {
      state.config.sound = payload;
    },
    setMvpAlertTimings(state, payload) {
      state.config.mvpAlertTimings = payload;
    },
  },
  actions: {
    setSound(context, payload) {
      context.commit("setSound", payload);
    },
    setMvpAlertTimings(context, payload) {
      context.commit("setMvpAlertTimings", payload);
    },
  },
  modules: {},
});
