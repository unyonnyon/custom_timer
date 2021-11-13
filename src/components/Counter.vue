<template>
  <div>
    <div v-if="isExist">
      <v-btn @click="start" block color="grey lighten-1">
        <v-icon left>mdi-fencing</v-icon>
        {{ name }}</v-btn
      >
    </div>
    <v-btn v-else :color="customColor" @click="clear" block
      >{{ zeroPadding(minRef, 2) }}:{{ zeroPadding(secRef, 2) }}</v-btn
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "@vue/composition-api";
import sound from "../assets/001.wav";
import store from "../store/index";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const INIT_MIN = 7;
    const INIT_SEC = 10;
    const minRef = ref(INIT_MIN);
    const secRef = ref(INIT_SEC);
    const isExist = ref(true);
    let timerObj = undefined;

    const zeroPadding = (NUM, LEN) => {
      return (Array(LEN).join("0") + NUM).slice(-LEN);
    };

    const customColor = computed(() => {
      let classes = "teal lighten-5";
      if (alertState.value === "caution") {
        classes = "yellow lighten-3";
      } else if (alertState.value === "warning") {
        classes = "orange lighten-3";
      } else if (alertState.value === "emergence") {
        classes = "red lighten-3";
      }
      return classes;
    });

    const alertState = ref("normal");

    const setAlertState = (prevState, newState) => {
      if (prevState !== newState) {
        alertState.value = newState;
        alerm(newState);
      }
    };

    const switchAlertState = (min, sec) => {
      const total = min * 60 + sec;
      const prevState = alertState.value;
      if (total <= 300) {
        setAlertState(prevState, "emergence");
      } else if (total <= 330) {
        setAlertState(prevState, "warning");
      } else if (total <= 420) {
        setAlertState(prevState, "caution");
      }
    };

    const start = () => {
      secRef.value = INIT_SEC;
      minRef.value = INIT_MIN;

      isExist.value = false;

      timerObj = setInterval(() => {
        secRef.value -= 1;
        if (secRef.value < 0) {
          minRef.value -= 1;
          secRef.value = 59;
        }
        switchAlertState(minRef.value, secRef.value);
      }, 1000);
    };

    const stop = () => {
      clearInterval(timerObj);
    };

    const clear = () => {
      stop();
      isExist.value = true;
    };

    const alerm = (alertState) => {
      if (!store.getters.isSoundActive) return;
      if (alertState !== "emergence" && alertState !== "warning") return;
      const audio = new Audio(sound);
      audio.play();
    };

    watch(secRef, () => {
      if (minRef.value == 0 && secRef.value == 0) {
        stop();

        isExist.value = true;
      }
    });

    return {
      minRef,
      secRef,
      isExist,
      start,
      clear,
      zeroPadding,
      customColor,
    };
  },
});
</script>
