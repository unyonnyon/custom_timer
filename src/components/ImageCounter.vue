<template>
  <v-card :width="width" height="170" elevation="10" class="pa-1">
    <div @click="setDefault">
      <v-img height="120" :src="img"></v-img>
    </div>
    <v-card-text class="px-1 mt-1 py-1">
      <div v-if="isExist" class="d-flex justify-around-between px-1">
        <v-btn icon @click="start" :disabled="!validateTimeString" class="mx-0">
          <v-icon color="primary">mdi-clock-alert-outline</v-icon>
        </v-btn>
        <v-text-field
          dense
          style="max-width: 68px"
          v-model="remainTimeString"
          class="mr-1"
          :rules="[validateTimeString]"
          :hide-details="true"
        ></v-text-field>
      </div>
      <v-btn v-else block @click="clear">
        {{ zeroPadding(minutes, Math.max(2, String(minutes).length)) }}:{{
          zeroPadding(seconds, 2)
        }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import store from "../store/index";
import { chainVoices, zeroPadding } from "./common";
import Worker from "worker-loader!@/workers/worker";

export default defineComponent({
  props: {
    img: {
      type: String,
      required: true,
      default: () => {
        return "";
      },
    },
    monster: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: () => {
        return 120;
      },
    },
  },
  setup(props) {
    let initMin = 120;
    let initSec = 0;

    const isExist = ref(true);
    const totalSec = ref(initMin * 60 + initSec);
    const startDate = ref(Date.now());
    const endDate = computed(() => {
      const total_mills = (initMin * 60 + initSec) * 1000;
      return startDate.value + total_mills;
    });
    const minutes = computed(() => {
      return Math.floor(totalSec.value / 60);
    });
    const seconds = computed(() => {
      return Math.floor(totalSec.value % 60);
    });

    const setDefault = () => {
      remainTimeString.value = "120:00";
    };

    const remainTimeString = ref("120:00");
    const validateTimeString = computed(() => {
      if (remainTimeString.value.match(/[^0-9:]/)) return false;
      const [min, sec] = remainTimeString.value.split(":");
      if (!min || !sec) return false;
      if (Number(min) === 0 && Number(sec) === 0) return false;
      if (Number(sec) < 0 || Number(sec) > 59) return false;
      if (Number(min) < 0) return false;
      return true;
    });

    const appearanceVoiceRef = ref();
    const emergenceVoiceRef = ref();
    const warningVoiceRef = ref();
    const cautionVoiceRef = ref();
    const loadVoice = async () => {
      appearanceVoiceRef.value = chainVoices([
        `./raw_sounds/mvps/${props.monster}.wav`,
        "./raw_sounds/actions/appeared.wav",
      ]);
      emergenceVoiceRef.value = chainVoices([
        `./raw_sounds/mvps/${props.monster}.wav`,
        "./raw_sounds/durations/2min.wav",
        "./raw_sounds/actions/appearance.wav",
      ]);
      warningVoiceRef.value = chainVoices([
        `./raw_sounds/mvps/${props.monster}.wav`,
        "./raw_sounds/durations/5min.wav",
        "./raw_sounds/actions/appearance.wav",
      ]);
      cautionVoiceRef.value = chainVoices([
        `./raw_sounds/mvps/${props.monster}.wav`,
        "./raw_sounds/durations/10min.wav",
        "./raw_sounds/actions/appearance.wav",
      ]);
    };

    let worker = undefined;
    const start = () => {
      const [m, s] = remainTimeString.value.split(":");
      initMin = Number(m);
      initSec = Number(s);
      startDate.value = Date.now();
      totalSec.value = initMin * 60 + initSec;
      alertState.value = initialAlertState(totalSec.value);
      loadVoice();

      isExist.value = false;
      worker = new Worker();

      worker.onmessage = (e) => {
        const remainSec = Math.floor((endDate.value - e.data) / 1000);
        if (remainSec <= 0) {
          worker.terminate();
          worker = undefined;
          isExist.value = true;
        }
        totalSec.value = remainSec;
      };
      worker.postMessage(1000);
    };
    watch(totalSec, () => {
      switchAlertState(minutes.value, seconds.value);
    });

    const stop = () => {
      if (worker !== undefined) {
        worker.terminate();
        worker = undefined;
      }
      isExist.value = true;
      alertState.value = initialAlertState(totalSec.value);
    };

    const clear = () => {
      stop();
    };

    const initialAlertState = (total) => {
      if (total <= 1) {
        return "appearance";
      } else if (total <= 120) {
        return "emergence";
      } else if (total <= 300) {
        return "warning";
      } else if (total <= 600) {
        return "caution";
      } else {
        return "normal";
      }
    };
    const alertState = ref(initialAlertState(totalSec.value));

    const setAlertState = (prevState, newState) => {
      if (prevState !== newState) {
        alertState.value = newState;
        alerm(newState);
      }
    };

    const alerm = async (alertState) => {
      if (!store.getters.isSoundActive) return;
      const timings = store.getters.mvpAlertTimings;
      switch (alertState) {
        case "appearance":
          await appearanceVoiceRef.value.play();
          break;
        case "emergence":
          if (timings.includes("2")) {
            await emergenceVoiceRef.value.play();
          }
          break;
        case "warning":
          if (timings.includes("5")) {
            await warningVoiceRef.value.play();
          }
          break;
        case "caution":
          if (timings.includes("10")) {
            await cautionVoiceRef.value.play();
          }
          break;
        default:
          break;
      }
    };

    const switchAlertState = (min, sec) => {
      const total = min * 60 + sec;
      const prevState = alertState.value;

      if (total <= 1) {
        setAlertState(prevState, "appearance");
      } else if (total <= 120) {
        setAlertState(prevState, "emergence");
      } else if (total <= 300) {
        setAlertState(prevState, "warning");
      } else if (total <= 600) {
        setAlertState(prevState, "caution");
      }
    };

    return {
      minutes,
      seconds,
      remainTimeString,
      validateTimeString,
      isExist,
      start,
      stop,
      clear,
      setDefault,
      zeroPadding,
    };
  },
});
</script>
