<template>
  <v-card :width="width" height="170">
    <div @click="setDefault">
      <v-img height="120" :src="img"></v-img>
    </div>
    <v-card-text class="px-2 mt-1 py-1">
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
        {{ zeroPadding(minRef, Math.max(2, String(minRef).length)) }}:{{
          zeroPadding(secRef, 2)
        }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import store from "../store/index";

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
    const isExist = ref(true);
    const minRef = ref(0);
    const secRef = ref(0);
    let timerObj = undefined;

    const setDefault = () => {
      console.log("set default");
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

    const start = () => {
      const [m, s] = remainTimeString.value.split(":");
      console.log(m, s);
      secRef.value = Number(s);
      minRef.value = Number(m);

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
      isExist.value = true;
      alertState.value = "normal";
    };

    const clear = () => {
      stop();
    };

    watch(secRef, () => {
      if (minRef.value == 0 && secRef.value == 0) {
        stop();
        isExist.value = true;
      }
    });

    const zeroPadding = (NUM, LEN) => {
      return (Array(LEN).join("0") + NUM).slice(-LEN);
    };

    const alertState = ref("normal");

    const setAlertState = (prevState, newState) => {
      if (prevState !== newState) {
        alertState.value = newState;
        alerm(newState);
      }
    };

    const alerm = async (alertState) => {
      if (!store.getters.isSoundActive) return;
      switch (alertState) {
        case "appearance":
          await voiceMessage("appeared");
          break;
        case "emergence":
          await voiceMessageWithDuration("2min", "appearance");
          break;
        case "warning":
          await voiceMessageWithDuration("5min", "appearance");
          break;
        case "caution":
          await voiceMessageWithDuration("10min", "appearance");
          break;
        default:
          break;
      }
    };

    const switchAlertState = (min, sec) => {
      const total = min * 60 + sec;
      const prevState = alertState.value;
      const timings = store.getters.mvpAlertTimings;
      if (total <= 1) {
        setAlertState(prevState, "appearance");
      } else if (timings.includes("2") && total === 120) {
        setAlertState(prevState, "emergence");
      } else if (timings.includes("5") && total === 300) {
        setAlertState(prevState, "warning");
      } else if (timings.includes("10") && total === 600) {
        setAlertState(prevState, "caution");
      }
    };

    const voiceMessage = async (mode) => {
      const monsterNameVoice = new Audio(
        require(`../assets/raw_sounds/mvps/${props.monster}.wav`)
      );
      const actionVoice = new Audio(
        require(`../assets/raw_sounds/actions/${mode}.wav`)
      );
      monsterNameVoice.onended = async () => {
        await actionVoice.play();
      };
      await monsterNameVoice.play();
    };

    const voiceMessageWithDuration = async (duration, mode) => {
      const monsterNameVoice = new Audio(
        require(`../assets/raw_sounds/mvps/${props.monster}.wav`)
      );
      const durationVoice = new Audio(
        require(`../assets/raw_sounds/durations/${duration}.wav`)
      );
      const actionVoice = new Audio(
        require(`../assets/raw_sounds/actions/${mode}.wav`)
      );
      monsterNameVoice.onended = async () => {
        await durationVoice.play();
      };
      durationVoice.onended = async () => {
        await actionVoice.play();
      };
      await monsterNameVoice.play();
    };

    return {
      minRef,
      secRef,
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
