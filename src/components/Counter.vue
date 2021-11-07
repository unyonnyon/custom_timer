<template>
  <div>
    <div v-if="isExist">
      <v-btn @click="start" color="cyan lighten-3">{{ name }} 討伐</v-btn>
    </div>
    <div v-else>{{ zeroPadding(minRef, 2) }}:{{ zeroPadding(secRef, 2) }}</div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "@vue/composition-api";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    const INIT_MIN = 15;
    const INIT_SEC = 0;
    const minRef = ref(INIT_MIN);
    const secRef = ref(INIT_SEC);
    const isExist = ref(true);
    let timerObj = undefined;

    const zeroPadding = (NUM, LEN) => {
      return (Array(LEN).join("0") + NUM).slice(-LEN);
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
      }, 1000);
    };

    const stop = () => {
      clearInterval(timerObj);
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
      zeroPadding,
    };
  },
});
</script>
