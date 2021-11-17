<template>
  <div>
    <div v-if="isExist">
      <v-btn @click="start" block color="grey lighten-1">
        <v-icon left>mdi-fencing</v-icon>
        {{ channel }}</v-btn
      >
    </div>
    <v-btn v-else :color="customColor" @click="clear" block
      >{{ zeroPadding(minRef, 2) }}:{{ zeroPadding(secRef, 2) }}</v-btn
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from "@vue/composition-api";
import store from "../store/index";

export default defineComponent({
  props: {
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
    const INIT_MIN = 20;
    const INIT_SEC = 0;
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

    const emergenceVoiceRef = ref();
    const warningVoiceRef = ref();
    const setVoice = async () => {
      emergenceVoiceRef.value = await voiceMessage("appeared");
      warningVoiceRef.value = await voiceMessageWithDuration(
        "30sec",
        "appearance"
      );
    };

    const start = () => {
      secRef.value = INIT_SEC;
      minRef.value = INIT_MIN;
      setVoice();

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

    const alerm = async (alertState) => {
      if (!store.getters.isSoundActive) return;
      if (alertState === "emergence") {
        await emergenceVoiceRef.value.play();
      } else if (alertState === "warning") {
        await warningVoiceRef.value.play();
      }
    };

    watch(secRef, () => {
      if (minRef.value == 0 && secRef.value == 0) {
        stop();
      }
    });

    const voiceMessage = async (mode) => {
      const src = store.getters.rawSounds;
      const channelVoice = new Audio(
        src(`../assets/raw_sounds/channels/${props.channel}.wav`)
      );
      channelVoice.load();

      const monsterNameVoice = new Audio(
        src(`./raw_sounds/minis/${props.monster}.wav`)
      );
      monsterNameVoice.load();

      const actionVoice = new Audio(src(`./raw_sounds/actions/${mode}.wav`));
      actionVoice.load();

      channelVoice.onended = () => {
        monsterNameVoice.play();
      };
      monsterNameVoice.onended = () => {
        actionVoice.play();
      };
      return channelVoice;
    };

    const voiceMessageWithDuration = async (duration, mode) => {
      const src = store.getters.rawSounds;
      const channelVoice = new Audio(
        src(`../assets/raw_sounds/channels/${props.channel}.wav`)
      );
      channelVoice.load();

      const monsterNameVoice = new Audio(
        src(`./raw_sounds/minis/${props.monster}.wav`)
      );
      monsterNameVoice.load();

      const durationVoice = new Audio(
        src(`../assets/raw_sounds/durations/${duration}.wav`)
      );
      durationVoice.load();

      const actionVoice = new Audio(src(`./raw_sounds/actions/${mode}.wav`));
      actionVoice.load();

      channelVoice.onended = () => {
        monsterNameVoice.play();
      };
      monsterNameVoice.onended = () => {
        durationVoice.play();
      };
      durationVoice.onended = () => {
        actionVoice.play();
      };
      channelVoice;
    };

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
