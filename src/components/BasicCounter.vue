<template>
  <v-card :width="width" elevation="10" class="pa-1">
    <v-img height="120" :src="img"></v-img>
    <v-card-text class="pa-2">
      <pure-timer channel="ch1" :monster="monster" :min="20" :sec="0" />
      <pure-timer channel="ch2" :monster="monster" :min="20" :sec="0" />
      <pure-timer channel="ch3" :monster="monster" :min="20" :sec="0" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import PureTimer from "./PureTimer.vue";

export default defineComponent({
  components: {
    PureTimer,
  },
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
  setup() {
    return {};
  },
});
</script>
