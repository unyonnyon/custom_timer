<template>
  <v-card width="120" height="170">
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

export default defineComponent({
  props: {
    img: {
      type: String,
      required: true,
      default: () => {
        return "";
      },
    },
  },
  setup() {
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
      }, 1000);
    };

    const stop = () => {
      clearInterval(timerObj);
    };

    const clear = () => {
      stop();
      isExist.value = true;
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
