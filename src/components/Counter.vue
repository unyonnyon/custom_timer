<template>
  <div>
    <div v-if="isExist">
      <v-btn @click="start" color="cyan lighten-3">{{ name }} 討伐</v-btn>
    </div>
    <v-sheet v-else :color="customColor"
      >{{ zeroPadding(minRef, 2) }}:{{ zeroPadding(secRef, 2) }}</v-sheet
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "@vue/composition-api";
import sound from "../assets/001.wav";

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
        classes = "yellow";
      } else if (alertState.value === "warning") {
        classes = "orange";
      } else if (alertState.value === "emergence") {
        classes = "red";
      }
      return classes;
    });

    const alertState = ref("normal");

    const switchAlertState = (min, sec) => {
      const total = min * 60 + sec;
      const prev_state = alertState.value;
      if (total <= 300) {
        if (prev_state !== "emergence") alertState.value = "emergence";
      } else if (total <= 330) {
        if (prev_state !== "warning") alertState.value = "warning";
      } else if (total <= 420) {
        if (prev_state !== "caution") alertState.value = "caution";
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

    const alerm = () => {
      const audio = new Audio(sound);
      audio.play();
    };

    watch(secRef, () => {
      if (minRef.value == 0 && secRef.value == 0) {
        stop();
        alerm();
        isExist.value = true;
      }
    });

    return {
      minRef,
      secRef,
      isExist,
      start,
      zeroPadding,
      customColor,
    };
  },
});
</script>
