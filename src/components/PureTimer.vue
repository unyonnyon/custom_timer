<template>
  <div>
    <div v-if="isExist">
      <v-btn @click="start" block color="grey lighten-1">
        <v-icon left>mdi-fencing</v-icon>
        {{ channel }}</v-btn
      >
    </div>
    <v-btn v-else :color="customColor" @click="clear" block
      >{{ zeroPadding(minutes, 2) }}:{{ zeroPadding(seconds, 2) }}</v-btn
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "@vue/composition-api";
import store from "../store/index";
import { chainVoices, zeroPadding } from "./common";
import Worker from "worker-loader!@/workers/worker";

export default defineComponent({
  props: {
    min: {
      type: Number,
      required: false,
      default: () => {
        return 5;
      },
    },
    sec: {
      type: Number,
      required: false,
      default: () => {
        return 35;
      },
    },
    monster: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isExist = ref(true);

    const totalSec = ref(props.min * 60 + props.sec);
    const startDate = ref(Date.now());
    const endDate = computed(() => {
      const total_mills = (props.min * 60 + props.sec) * 1000;
      return startDate.value + total_mills;
    });
    const minutes = computed(() => {
      return Math.floor(totalSec.value / 60);
    });
    const seconds = computed(() => {
      return Math.floor(totalSec.value % 60);
    });

    const customColor = computed(() => {
      let color = "teal lighten-5";
      switch (alertState.value) {
        case "caution":
          color = "yellow lighten-3";
          break;
        case "warning":
          color = "orange lighten-3";
          break;
        case "emergence":
          color = "red lighten-3";
          break;
        default:
          break;
      }
      return color;
    });

    const initialAlertState = (total) => {
      if (total <= 1) {
        return "emergence";
      } else if (total <= 30) {
        return "warning";
      } else {
        return "normal";
      }
    };
    const alertState = ref(initialAlertState(props.min * 60 + props.sec));
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

    const emergenceVoiceRef = ref();
    const warningVoiceRef = ref();
    const loadVoice = async () => {
      emergenceVoiceRef.value = chainVoices([
        `./raw_sounds/channels/${props.channel}.wav`,
        `./raw_sounds/minis/${props.monster}.wav`,
        "./raw_sounds/actions/appeared.wav",
      ]);
      warningVoiceRef.value = chainVoices([
        `./raw_sounds/channels/${props.channel}.wav`,
        `./raw_sounds/minis/${props.monster}.wav`,
        "./raw_sounds/durations/30sec.wav",
        "./raw_sounds/actions/appearance.wav",
      ]);
    };

    let worker = undefined;
    const start = () => {
      loadVoice();
      startDate.value = Date.now();
      worker = new Worker();
      isExist.value = false;

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
      alertState.value = initialAlertState(props.min * 60 + props.sec);
    };

    const clear = () => {
      stop();
    };

    const alerm = async (alertState) => {
      if (!store.getters.isSoundActive) return;
      if (alertState === "emergence") {
        await emergenceVoiceRef.value.play();
      } else if (alertState === "warning") {
        await warningVoiceRef.value.play();
      }
    };

    return {
      minutes,
      seconds,
      isExist,
      start,
      clear,
      zeroPadding,
      customColor,
    };
  },
});
</script>
